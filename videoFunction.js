import ffmpeg from "fluent-ffmpeg"

const generateVideo = async (videoDetails, audioPath, transcriptionDetails) => {
  try {
    const first = "./3571264-hd_1280_720_30fps.mp4"
    const second = "./3571264-hd_1280_720_30fps.mp4"
    const third = "./3571264-hd_1280_720_30fps.mp4




    
    const concatContent = videoDetails
      .map((video) => `file '${video.path}'`)
      .join("\n");
    await fs.writeFile(tempVideoList, concatContent);


    
    const subtitleContent = transcriptionDetails
      .map(
        (item, index) =>
          `${index + 1}\n${item.start} --> ${item.end}\n${item.text}\n\n`
      )
      .join("");
    await fs.writeFile(tempSubtitles, subtitleContent);

    
    await new Promise((resolve, reject) => {
      ffmpeg({source: first})
        .input(second)
        .input(third)
        .on("end", ()=>console.log("MERGING DONE!"))
        .on("error", (err)=>console.log(err)
        )
        .mergeToFile('mergeVideo.mp4')
    });

    await new Promise((resolve, reject) => {
      ffmpeg(tempVideoPath)
        .input(audioPath)
        .input(tempSubtitles)
        .outputOptions("-c:v copy", "-c:a aac", "-c:s mov_text")
        .outputOptions("-shortest")
        .save(outputPath)
        .on("end", resolve)
        .on("error", reject);
    });

    await fs.remove(tempVideoList);
    await fs.remove(tempSubtitles);
    await fs.remove(tempVideoPath);

    return outputPath;
  } catch (error) {
    console.error("Error generating video:", error);
  }
};

export default generateVideo;
