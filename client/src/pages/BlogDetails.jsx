import ImageOne from "/images/sample.svg";


const BlogDetails = () => {

  return (
    <div className="pt-10 md:px-8 lg:px-16 xl:px-32">
      <div className="text-sm sm:text-base my-3 font-medium flex justify-between dark:text-t-dark">
        <span>5 min read</span>
        <span>10 views</span>
      </div>
      <div className="relative">
        <img
          src={ImageOne}
          alt=""
          className="w-full brightness-[80%] object-cover max-h-[30rem] "
        />
        <div className="flex gap-4 absolute top-3 left-2 max-w-full flex-wrap">
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
          <div
            className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
            role="badge"
          >
            design
          </div>
        </div>
        <div className="absolute bottom-0 left-2">
          <h2 className="uppercase font-bold text-xl sm:text-4xl lg:text-5xl lg:leading-[4rem] py-2 px-1 text-white dark:text-t-dark mb-3">
            Integer Maecenas Eget Viverra Repete Incuras und Rwrherufhk
          </h2>
        </div>
      </div>
      <div>
        <p className="font-light text-center text-[14px] sm:text-base text-t-light my-4 dark:text-c-dark">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsam
          molestiae dolorem delectus culpa? Corporis quo eaque commodi inventore
          tempore!
        </p>
      </div>
      <div className="my-5">
        <div className="flex justify-between text-sm text-c-light dark:text-c-dark font-semibold">
          <span>By Lorem ipsum.</span>
          <span>13 Jan, 2022</span>
        </div>
      </div>
      <article className="first-letter:capitalize first-letter:font-semibold first-letter:text-4xl font-light leading-[1.9rem] sm:leading-[1.85rem] sm:max-w-3xl mx-auto dark:text-t-dark">
        Mindfulness, often described as a state of present-moment awareness,
        holds profound significance in today’s fast-paced world. It’s a practice
        deeply rooted in ancient traditions, fostering a heightened sense of
        consciousness and inner peace. Mastering mindfulness involves
        cultivating an acute awareness of one’s thoughts, emotions, bodily
        sensations, and surroundings without judgment or attachment.At its core,
        mindfulness encourages individuals to observe their thoughts and
        feelings without reacting to them impulsively. It invites a deliberate
        focus on the present moment, allowing individuals to detach from the
        incessant stream of worries about the future or regrets about the past.
        This deliberate attention cultivates a sense of clarity and tranquility,
        providing a pathway to emotional regulation and mental well-being. One
        of the foundational aspects of mindfulness is centered around
        mindfulness meditation, a practice involving focused breathing and
        non-judgmental observation of thoughts. Through regular meditation
        sessions, practitioners develop an increased awareness of their mental
        processes. This heightened awareness extends beyond meditation sessions,
        permeating daily activities, and interactions.A key component of
        mastering mindfulness is embracing non-judgmental observation. It
        involves acknowledging thoughts, emotions, and sensations without
        labeling them as good or bad. Instead, individuals are encouraged to
        adopt an attitude of curiosity and acceptance, allowing experiences to
        unfold naturally. This non-reactive stance towards inner experiences
        fosters resilience and emotional intelligence.Mindfulness is not limited
        to meditation but can be integrated into various aspects of life.
        Practicing mindfulness while eating involves savoring each bite,
        engaging senses, and appreciating the nourishment provided by food.
        Mindful listening involves giving undivided attention to others without
        interrupting or forming judgments. These practices enhance the quality
        of experiences, fostering deeper connections and a sense of
        fulfillment.Moreover, mindfulness finds its application in stress
        reduction and managing anxiety. By anchoring attention to the present
        moment, individuals can alleviate stress by breaking the cycle of
        ruminative thoughts that often exacerbate stress levels. Through
        mindfulness-based stress reduction techniques, individuals learn to
        respond to stressors more effectively, enhancing resilience in the face
        of adversity.Mindfulness also plays a pivotal role in enhancing focus
        and concentration. In a world filled with distractions, training the
        mind to remain focused on the task at hand is invaluable. By cultivating
        mindfulness, individuals develop the ability to redirect attention back
        to the present moment, fostering increased productivity and mental
        clarity.The practice of mindfulness has garnered scientific interest,
        with numerous studies highlighting its potential benefits. Research
        suggests that regular mindfulness practice can lead to structural
        changes in the brain, specifically in areas associated with attention
        regulation and emotional processing. Furthermore, studies indicate that
        mindfulness-based interventions can alleviate symptoms of depression,
        anxiety disorders, and chronic pain. Mastering mindfulness requires
        consistent practice and patience. It’s not about achieving a state of
        perpetual bliss but rather developing a skill that enhances ones
        relationship with oneself and the world. It involves acknowledging the
        transient nature of thoughts and emotions, recognizing that they come
        and go like passing clouds in the sky.In essence, mastering mindfulness
        is an ongoing journey marked by self-discovery and self-compassion. It’s
        about cultivating a profound connection with the present moment,
        embracing life’s experiences with openness and curiosity. Through
        dedicated practice and a willingness to be fully present, individuals
        can harness the transformative power of mindfulness, enriching their
        lives and fostering a deep sense of inner peace and contentment.
        Mindfulness, often described as a state of present-moment awareness,
        holds profound significance in today’s fast-paced world.
      </article>
    </div>
  );
};

export default BlogDetails;
