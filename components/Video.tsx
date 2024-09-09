'use client'

import { useState } from "react";

function Video() {
  const [isHide, setIsHide] = useState(false);

  setTimeout(() => setIsHide(true), 5000);

  return (
    <>
        <video className="col-span-3 aspect-video border-2 w-full" poster={'/video-thumbnail.png'} controls preload="none">
            <source src="/video.mp4" type="video/mp4" />
            <track
                src="/"
                srcLang="id"
            />
            Your browser does not support the video tag.
        </video>
    </>
  )
}

export default Video