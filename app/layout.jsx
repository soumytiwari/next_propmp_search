import '@styles/global.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

// change matadata of our application
export const metadata = {
    title: 'Promp Palace',
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
                <Nav/>
                {/* render all the children */}
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout


// we wanna use navigation bar in within all of the application pages (which is what layout is for), that's why we will use navigation bar component here. 