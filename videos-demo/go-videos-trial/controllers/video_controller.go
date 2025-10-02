package controllers

import (
	"go-videos-trial/models"
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
	exec.Command("mkdir", "-p", outputDir).Run()

	// convert to hls
	hls := exec.Command("ffmpeg",
		"-i", inputPath,
		"-profile:v", "baseline",
		"-level", "3.0",
		"-s", "640x360",
		"-start_number", "0",
		"-hls_time", "10",
		"-hls_list_size", "0",
		"-f", "hls",
		outputDir+"/index.m3u8",
	)
	if err := hls.Run(); err != nil {
		return err
	}

	// generate thumbnails
	thumbnail := exec.Command("ffmpeg",
		"-i", inputPath,
		"-vf", "fps=1/10",
		outputDir+"/thumb%03d.jpg",
	)
	if err := thumbnail.Run(); err != nil {
		return err
	}

	// duration
	duration := exec.Command(
		"ffprobe", "-v", "error", "-show_entries", "format=duration",
		"-of", "default=noprint_wrappers=1:nokey=1", inputPath)
	out, err := duration.Output()
	if err != nil {
		return err
	}

	durationStr := strings.TrimSpace(string(out))
	durationFloat, _ := strconv.ParseFloat(durationStr, 64)

	updates := map[string]interface{}{
		"HLSPath":   outputDir + "/index.m3u8",
		"Thumbnail": outputDir + "/thumbnail.jpg",
		"Duration":  durationFloat,
		"Status":    "ready",
	}

	return s.storage.UpdateVideo(videoId, updates)
}

// upload video
func (s *APIServer) HandleUploadVideo(c *gin.Context) {

	title := c.PostForm("title")
	description := c.PostForm("description")
	if title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "title is required"})
		return
	}

	// file
	file, err := c.FormFile("video")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No video uploaded"})
		return
	}

	// upload dir
	uploadDir := "uploads/videos/raw"
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create directory"})
		return
	}

	// save file
	fileName := uuid.New().String() + "_" + file.Filename
	filePath := filepath.Join(uploadDir, fileName)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	// file size
	fileStat, err := os.Stat(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get file size"})
		return
	}
	fileSize := fileStat.Size()

	// create video model
	video := &models.Video{
		Title:       title,
		Description: description,
		FilePath:    filePath,
		Size:        fileSize,
		Status:      "processing",
	}

	// save to db
	if err := s.storage.UploadVideo(video); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload"})
		return
	}

	// output dir
	outputDir := filepath.Join("uploads/videos/processed", video.ID)
	if err := os.MkdirAll(outputDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create processed dir"})
		return
	}

	// run ffmpeg
	go s.processVideo(video.ID, filePath, outputDir)

	c.JSON(http.StatusOK, gin.H{"message": "Video uploaded", "video": video})
}
