import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';



cloudinaryV2.config({ 
    cloud_name: 'dm4vwtxjs', 
    api_key: '127371483375234', 
    api_secret: 'SwsquzkFInW4tpbnBwi5AlscLEY',
    secure: true,
})

const generateVideo = async (transcription_details, video_details, audio_link) => {
  try {


    const videoSources = video_details.map((video, index) => {
      const transcription = transcription_details[index];
      return {
        resource_type: 'video',
        type: 'fetch',
        public_id: video.url, 
        transformation: [
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: transcription.text, 
              gravity: 'center',
              color: 'white',
              background: 'rgba(0, 0, 0, 0.5)',
            },
            start_offset: transcription.start, 
            end_offset: transcription.end, 
          },
          { width: 1280, height: 720, crop: 'scale' },
        ],
      };
    });

    //audio
    const audioSource = {
        resource_type: 'video',
        type: 'fetch',
        public_id: audio_link, // Use the uploaded audio URL
        transformation: [
          { overlay: 'audio', start_offset: 0, end_offset: 'duration' }, // Add audio to the entire video
        ],
      };
  
      // Combine the videos and audi
      const final = [
        ...videoSources,
        audioSource, 
      ];

    // console.log(final)

    //combinig all videos with audio
    const uploadResult = await cloudinaryV2.uploader.upload(
      `video/${JSON.stringify(final)}`,
      {
        resource_type: 'video',
        public_id: 'generated_video', 
        overwrite: true,
      }
    );

    // const uploadResult = await cloudinaryV2.uploader
    // .upload('3571264-hd_1280_720_30fps.mp4', {
    //   folder: 'videos',
    //   resource_type: 'video'})
    // .then(console.log);

    // console.log('Video generated successfully:', uploadResult);
    return "uploadResult.secure_url"; 
  } catch (error) {
    console.error('Error generating video:', error);
  }
};

export default generateVideo;
