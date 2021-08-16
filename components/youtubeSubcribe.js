const YouTubeSubscribe = () => {
  return (
    <section className='youtubeSubscribe' style={{ display: "flex" }}>
      <div
        className='g-ytsubscribe'
        data-channelid={process.env.NEXT_PUBLIC_DATA_YOUTUBE_ID}
        data-layout='default'
        data-count='default'
      ></div>
    </section>
  );
};

export default YouTubeSubscribe;
