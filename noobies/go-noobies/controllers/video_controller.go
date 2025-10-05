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
		// map scaled video + audio
		"-map", "[v360out]", "-c:v:0", "libx264", "-b:v:0", "800k",
		"-map", "[v720out]", "-c:v:1", "libx264", "-b:v:1", "2000k",
		"-map", "[v1080out]", "-c:v:2", "libx264", "-b:v:2", "4000k",
		"-map", "a:0", "-c:a:0", "aac", "-ar", "48000", "-b:a:0", "128k",
		"-map", "a:0", "-c:a:1", "aac", "-ar", "48000", "-b:a:1", "128k",
		"-map", "a:0", "-c:a:2", "aac", "-ar", "48000", "-b:a:2", "128k",

		// HLS options
		"-f", "hls",
		"-hls_time", "10",
		"-hls_playlist_type", "vod",
		"-hls_segment_filename", fmt.Sprintf("%s/data%%v_%%03d.ts", outputDir), // flattened segments
		"-master_pl_name", "master.m3u8",
		"-var_stream_map", "v:0,a:0 v:1,a:1 v:2,a:2",
		fmt.Sprintf("%s/stream_%%v.m3u8", outputDir))

	if err := hls.Run(); err != nil {
		return fmt.Errorf("hls generation failed: %w", err)
	}

	// generate thumbnails
	thumbnail := exec.Command("ffmpeg",
		"-i", inputPath,
		"-vf", "fps=1/10",
		fmt.Sprintf("%s/thumb%%03d.jpg", outputDir),
	)
	if err := thumbnail.Run(); err != nil {
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
		"hls_path":  outputDir + "/master.m3u8",
		"thumbnail": outputDir + "/thumb001.jpg",
		"duration":  durationFloat,
		"status":    "ready",
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

// delete videos
func (s *APIServer) deleteVideos(moduleID string) error {
	videos, err := s.storage.GetVideosByModuleID(moduleID)
	if err != nil {
		return fmt.Errorf("Failed to get videos %s: %w", moduleID, err.Error())
	}

	for _, video := range *videos {
		if video.FilePath != "" {
			if err := os.Remove(video.FilePath); err != nil && !os.IsNotExist(err) {
				fmt.Printf("Error deleting raw file %s: %v\n", video.FilePath, err)
			} else {
				fmt.Printf("Deleted raw file: %s\n", video.FilePath)
			}
		}

		processedDir := filepath.Join("uploads", "videos", "processed", video.ID)
		if err := os.RemoveAll(processedDir); err != nil && !os.IsNotExist(err) {
			fmt.Printf("Error deleting processed folder: %v\n", err)
		} else {
			fmt.Printf("Deleted processed folder: %s\n", video.ID)
		}
	}
	return nil
}