export async function captureScreenshot(): Promise<Blob> {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' }
    });
    
    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    const bitmap = await imageCapture.grabFrame();
    
    // Convert to blob
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext('2d');
    context?.drawImage(bitmap, 0, 0);
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        // Stop screen capture
        track.stop();
        resolve(blob!);
      }, 'image/jpeg', 0.8); // Compress to JPEG with 80% quality
    });
  } catch (error) {
    console.error('Screenshot capture failed:', error);
    throw error;
  }
}