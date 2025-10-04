package controllers

import (
	"fmt"
	"go-noobies/models"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// process video
func (s *APIServer) processVideo(videoId string, inputPath, outputDir string) error {
	// create dir
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return err
	}

	// hls generation
	hls := exec.Command("ffmpeg",
		"-i", inputPath,
		"-filter_complex",
		"[0:v]split=3[v360][v720][v1080];"+
			"[v360]scale=w=640:h=360:force_original_aspect_ratio=decrease[v360out];"+
			"[v720]scale=w=1280:h=720:force_original_aspect_ratio=decrease[v720out];"+
			"[v1080]scale=w=1920:h=1080:force_original_aspect_ratio=decrease[v1080out]",
		// video mappings
		"-map", "[v360out]", "-c:v:0", "libx264", "-b:v:0", "800k",
		"-map", "[v720out]", "-c:v:1", "libx264", "-b:v:1", "2000k",
		"-map", "[v1080out]", "-c:v:2", "libx264", "-b:v:2", "4000k",
		// audio mappings
		"-map", "a:0", "-c:a:0", "aac", "-ar", "48000", "-b:a:0", "128k",
		"-map", "a:0", "-c:a:1", "aac", "-ar", "48000", "-b:a:1", "128k",
		"-map", "a:0", "-c:a:2", "aac", "-ar", "48000", "-b:a:2", "128k",

		// HLS options
		"-f", "hls",
		"-hls_time", "10",
		"-hls_playlist_type", "vod",
		"-hls_segment_filename", fmt.Sprintf("%s/data%%v_%%03d.ts", outputDir),
		"-master_pl_name", "master.m3u8",
		"-var_stream_map", "v:0,a:0 v:1,a:1 v:2,a:2",
		fmt.Sprintf("%s/stream_%%v.m3u8", outputDir))

	if err := hls.Run(); err != nil {
		s.storage.UpdateVideo(videoId, map[string]interface{}{"Status": "failed to update video"})
		return fmt.Errorf("hls generation failed: %w", err)
	}

	// generate thumbnails
	thumbPath := filepath.Join(outputDir, "thumb_"+videoId+".jpg")
	thumbnail := exec.Command(
		"ffmpeg",
		"-i", inputPath,
		"-vf", "fps=1/10",
		thumbPath,
	)
	if err := thumbnail.Run(); err != nil {
		s.storage.UpdateVideo(videoId, map[string]interface{}{"Status": "failed to update thumbnail"})
		return fmt.Errorf("thumbnail generation failed: %w", err)
	}

	// duration
	duration := exec.Command(
		"ffprobe", "-v", "error", "-show_entries", "format=duration",
		"-of", "default=noprint_wrappers=1:nokey=1", inputPath)
	out, err := duration.Output()
	if err != nil {
		return fmt.Errorf("duration fetch failed: %w", err)
	}

	durationStr := strings.TrimSpace(string(out))
	durationFloat, _ := strconv.ParseFloat(durationStr, 64)

	updates := map[string]interface{}{
		"HLSPath":   filepath.Join(outputDir, "master.m3u8"),
		"Thumbnail": thumbPath,
		"Duration":  durationFloat,
		"Status":    "ready",
	}

	return s.storage.UpdateVideo(videoId, updates)
}

// upload video
func (s *APIServer) handleUploadVideo(c *gin.Context) (*models.Video, error) {
	// file
	file, err := c.FormFile("video")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No video uploaded"})
		return nil, err
	}

	// upload dir
	uploadDir := "uploads/videos/raw"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to created upload directory"})
		return nil, err
	}

	// save file local
	fileName := uuid.New().String() + "_" + file.Filename
	filePath := filepath.Join(uploadDir, fileName)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return nil, err
	}

	// file size
	fileStat, err := os.Stat(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get file size"})
		return nil, err
	}
	fileSize := fileStat.Size()

	// create video model
	video := &models.Video{
		FilePath: filePath,
		Size:     fileSize,
		Status:   "processing",
	}

	// save to db
	if err := s.storage.UploadVideo(video); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload"})
		return nil, err
	}

	// output dir
	outputDir := filepath.Join("uploads/videos/processed", video.ID)
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to created processed dir"})
		return nil, err
	}

	// run ffmpeg
	go func() {
		if err := s.processVideo(video.ID, filePath, outputDir); err != nil {
			fmt.Printf("Error processing video %s: %v\n", video.ID, err)
		}
	}()

	return video, nil
}

// create module
func (s *APIServer) HandleCreateModule(c *gin.Context) {
	moduleTitle := c.PostForm("module_title")
	moduleDescription := c.PostForm("module_description")
	courseID := c.PostForm("course_id")
	if moduleTitle == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Module title is required"})
		return
	}
	if courseID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course id is required"})
		return
	}

	video, err := s.handleUploadVideo(c)
	if err != nil {
		return
	}

	module := &models.Module{
		CourseID:          courseID,
		ModuleTitle:       moduleTitle,
		ModuleDescription: moduleDescription,
		Video:             *video,
	}

	if err := s.storage.CreateModule(module); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save course"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "New module created", "module": module})
}

// create course
func (s *APIServer) HandleCreateCourse(c *gin.Context) {
	title := c.PostForm("title")
	description := c.PostForm("description")
	if title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}

	course := &models.Course{
		Title:       title,
		Description: description,
	}

	if err := s.storage.CreateCourse(course); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save course"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "New course created", "course": course})
}
