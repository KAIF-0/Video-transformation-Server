import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import generatevideo from "./videoFunction.js"

const app = new Hono();
const PORT = 3000;

const videoInstance = new Hono();

const transcption_details = [
  {
    "id": 0,
    "end": 18.6,
    "seek": 0,
    "text": " the little tales they tell are false the door was barred locked and bolted as well ripe pears are fit for a queen's table a big wet stain was on the round carpet",
    "start": 0
  },
  {
    "id": 1,
    "end": 31.840000000000003,
    "seek": 1860,
    "text": " the kite dipped and swayed but stayed aloft the pleasant hours fly by much too soon the room was crowded with a mild wab",
    "start": 18.6
  },
  {
    "id": 2,
    "end": 45.2,
    "seek": 1860,
    "text": " the room was crowded with a wild mob this strong arm shall shield your honour she blushed when he gave her a white orchid",
    "start": 31.840000000000003
  },
  {
    "id": 3,
    "end": 48.6,
    "seek": 1860,
    "text": " the beetle droned in the hot june sun",
    "start": 45.2
  },
  {
    "id": 4,
    "end": 52.38,
    "seek": 4860,
    "text": " the beetle droned in the hot june sun",
    "start": 48.6
  }
]

const video_details = [
  {
    url: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4',
    length: 33
  },
  {
    url: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4',
    length: 33
  },
  {
    url: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4',
    length: 33
  },
  {
    url: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4',
    length: 33
  },
  {
    url: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4',
    length: 33
  }
]


  const audio_link = "https://dbuzz-assets.s3.amazonaws.com/static/sample_audio.mp3";

videoInstance.get('/*',(c)=>{
  generatevideo(transcption_details, video_details, audio_link)
  return c.text("Hello World!")
})

app.route('/', videoInstance);


app.onError((err, c) => {
    console.error(`${err}`)
    return c.text('Custom Error Message', 500)
  })

app.notFound((c) => {
    return c.text('Custom 404 Message', 404)
  })

serve({
    fetch: app.fetch,
    port: PORT,
  })
