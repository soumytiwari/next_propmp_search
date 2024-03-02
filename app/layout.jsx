import '@styles/global.css';

// change matadata of our application
export const metadata = {
    title: '',
    description: 'Discover & Share AI Prompts'
}

// layout is going to be wrapped around everything
const Rootlayout = ({children}) => {                    //  getting the children from the prompts
  return (
    <html lang='en'>
        <body>
            <div className="main">
                {/* this is just going to change background */}
                <div className="gradient"/>
            </div>

            {/* main part of our application */}
            <main className="app">
                {/* render all the children */}
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout
