
const Home = () => {
  return (
    // full width container, flex on columns, flex off column
    <section className="w-full flex-center flex-col"> 
      <h1 className="head_text text-center">
        Discover & Share
        {/* br max md hidden-> it will break on smaller devices, hide on large devices  */}
        <br className="max-md:hidden"/> 
        <span className="orange_gradient text-center"> 
          AI Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>

      {/* Feed */}
    </section>
  )
}

export default Home