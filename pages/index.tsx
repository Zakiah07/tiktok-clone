// import axios from "axios";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";
import React from "react";
import { NextPage } from "next";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  console.log(videos);

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos?.map((video: Video) => (
          <VideoCard
            post={video}
            key={video._id}
          />
        ))
      ) : (
        <NoResults text={`No Videos`} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  if (topic) {
    const response = await fetch(`${BASE_URL}/api/discover/${topic}`);
    const data = await response.json();
    return {
      props: {
        videos: data,
      },
    };
  } else {
    const response = await fetch(`${BASE_URL}/api/post`);
    const data = await response.json();
    return {
      props: {
        videos: data,
      },
    };
  }
};

export default Home;
