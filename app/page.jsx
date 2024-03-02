// used rafce "from extension: ES7+.." for creating react function

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        {/* here, the underscore properties are self made css properties */}
        <h1 className="head_text text_center">
            Discover and Share
            {/* this break will remain hidden in the large devices like laptop and will be break the content on smaller devices*/}
            <br className="max-md:hidden"/>
            <span className="orange_gradient text_center"> AI-Powered prompts
            </span>
        </h1>
        <p className="desc text-center">
            At prompt palace, you get to discover, share and create creative propmpts. An all AI Powered tool.
        </p>

        {/* feed */}
    </section>
  )
}

export default Home
