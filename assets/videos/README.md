# Video Assets Placeholder

This folder contains demo videos for the Netflix-style portfolio trailers.

## Required Video Files:

1. **agrimitra-demo.mp4** - Demo video for AgriMitra project
2. **finance-guru-demo.mp4** - Demo video for Finance Guru project  
3. **campus-nav-demo.mp4** - Demo video for Campus Navigator project
4. **steam-analysis-demo.mp4** - Demo video for Steam Analytics project
5. **hero-background.mp4** - Optional background video for hero section

## Video Specifications:

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (1080p) recommended
- **Duration**: 2-4 minutes maximum
- **File Size**: Under 50MB per video
- **Frame Rate**: 30fps recommended

## How to Create Demo Videos:

1. **Screen Recording**: Use tools like OBS Studio, QuickTime, or Loom
2. **Content**: Show your project running, demonstrate key features
3. **Structure**: 
   - 10-15 seconds: Project overview
   - 60-90 seconds: Key features demonstration
   - 30-45 seconds: Technical highlights
   - 15-30 seconds: Call to action

4. **Optimization**: Compress videos for web using tools like:
   - HandBrake
   - FFmpeg
   - Online video compressors

## Example FFmpeg Command for Optimization:

```bash
ffmpeg -i input-video.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart output-video.mp4
```

## Fallback Behavior:

If video files are not available, the portfolio will:
- Show a placeholder with play icon
- Display "Demo video coming soon!" message
- Provide links to live demos and GitHub repositories
- Maintain full functionality without videos

## Adding Your Videos:

1. Record your project demonstrations
2. Convert to MP4 format using the specifications above
3. Rename files to match the required naming convention
4. Place files in this directory
5. The portfolio will automatically detect and use the videos

Note: Make sure your web server can serve video files properly with correct MIME types.
