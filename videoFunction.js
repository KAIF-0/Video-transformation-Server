import Creatomate from 'Creatomate'
// const { endianness } = require('os');
// const { text } = require('stream/consumers');

async function generatevideo(transcption_details, video_details, audio_link) {
    const client = new Creatomate.client("api key");

    const scenes = video_details.map((video, index) => ({
        type: 'composition',
        duration: video.duration,
        elements: [
            {
                type: 'video',
                source: video.url,
                fit: 'cover',
            },
            {
                type: 'text',
                text: getTranscriptionFortime(transcption_details, video.startTime),
                y: '85%',
                color: '#ffffff',
                background_color: 'rgba(0,0,0,0.5)',
                animations: [
                    new Creatomate.TextSlideUpLineByLine({
                        time: 0,
                        duration: 1,
                        easing: 'quadratic-out'
                    })
                ]
            }
        ]
    }));

    const audioElement = {
        type: 'audio',
        source: audio_link,
        duration: getTotalDuration(video_details),
        audioFadeOut: 2,
    };

    const render = await client.render({
        output_format: 'mp4',
        elements: [
            audioElement,
            ...scenes,
        ]
    });
    return render.url;
}

function getTranscriptionFortime(transcriptons, time) {
    return transcriptons.find(t =>
        time >= t.startTime && time <= t.endTime)?.text || '';
}

function getTotalDuration(videos) {
    return videos.reduce((sum, video) => sum + video.duration, 0);
}

const transcriptions = [
    { text: "Hello world", startTime: 0, endTime: 3 },
    { text: "Second text", startTime: 3, endTime: 6 }
];

const videos = [
    { url: "video1.mp4", duration: 3, startTime: 0 },
    { url: "video2.mp4", duration: 3, startTime: 3 },
];

const audioUrl = "background-music.mp3";

const videoUrl = await generatevideo(transcriptions, videos, audioUrl);