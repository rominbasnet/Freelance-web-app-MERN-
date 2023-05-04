import { Link } from "react-router-dom";

const Landing = () =>{
  return(

    <>
        <header className="fixed inset-0 h-16  flex justify-between items-center px-3">
            <img className="md:h-6 lg:h-10" src="images/logo.png" alt="" />
            <nav className="flex items-center h-16 ">

                <div className="hidden lg:inline-flex text-red-400 rounded-full text-sm lg:text-base text-white space-x-4 lg:space-x-8 font-medium">
                    <Link to= "/"> Home </Link>
                    <Link to= "/businesslogin"> Business Login </Link>
                    <Link to= "/freelancerlogin"> Freelancer Login </Link>
                </div>
            </nav>
        </header>
        <section className="pt-16 ">
            <div
                className="lg:flex lg:items-center px-4 pt-9 max-w-lg md:max-w-xl lg:max-w-4xl mx-auto">
                <div className="lg:pt-16 pb-32">
                    <h1 className="font-bold  text-blue-500 text-xl xs:text-2xl lg:text-4xl leading-relaxed font-primary">
                        Work and Connect With Us
                    </h1>
                    <p className="pt-6 text-gray-500 leading-loose text-sm">
                        Register your business with us and find developers with skill which perfectly match your skill requirement<br />
                        You can also register as a freelancer to work on real-time projects.
                    </p>
                    <div className="inline-block bg-white shadow-md mt-5 px-8 py-3 text-blue-400 rounded-full font-bold uppercase font-primary tracking-wide text-sm mr-4">
                       <Link to="/freelancerregister"> Start as a Freelancer </Link>
                    </div>
                    <div className="inline-block bg-white  shadow-md mt-5 px-8 py-3 text-blue-400 rounded-full font-bold uppercase font-primary tracking-wide text-sm mr-4">
                       <Link to="/businessregister"> Start as a Business </Link>
                    </div>
                </div>
                <img
                    src="images/intro-mobile.png"
                    alt=""
                    className="lg:h-64 flex-shrink-0"
                />
            </div>
        </section>
        <section className="min-h-screen backdrop-blur-sm">
            <div className="py-16 text-center">
                <h2 className="bg-lightBlue-100 inline-block px-8 py-2 font-primary font-bold uppercase text-sm tracking-wide rounded-full">
                    Features
                </h2>
                <h3 className="mt-4 text-xl font-primary font-bold bg-gradient-to-b from-cyan to-blue-500 bg-clip-text text-transparent">
                    Amazing Features
                </h3>
            </div>
            <div className="px-16 lg:grid lg:grid-cols-3 gap-4">
                <div>
                    <div className="mt-6 flex space-x-12 mr-4">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-cyan h-16 w-16 rounded-full flex-shrink-0">
                        </div>
                        <div>
                            <h4 className="text-2xl text-blue-500 font-primary font-bold">
                                User Friendly
                            </h4>
                            <p className="pt-3 text-gray-500 leading-loose text-sm">
                                Simple and easy to navigate UI
                            </p>
                        </div>
                      </div>
                    <div className="mt-6 flex space-x-12 mr-4">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-cyan h-16 w-16 rounded-full flex-shrink-0">
                        </div>

                        <div>
                            <h4 className="text-2xl text-blue-500 font-primary font-bold">
                                Super Fast Speed
                            </h4>
                            <p className="pt-3 text-gray-500 leading-loose text-sm">
                                Minimal response time and real time job updates 
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex space-x-12 mr-4">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan h-16 w-16 rounded-full flex-shrink-0">
                        </div>

                        <div>
                            <h4 className="text-2xl  text-blue-500 font-primary font-bold">
                                No Bidding
                            </h4>
                            <p className="pt-3 text-gray-500 leading-loose text-sm">
                                No more bidding on jobs and hassle free development
                            </p>
                        </div>
                    </div>
                </div>
                <h1></h1>
                <div>
                    <div className="mt-2 flex  space-x-2 space-x-reverse ml-2">
                    <div className="mt-2 flex space-x-12">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan h-16 w-16 rounded-full flex-shrink-0">
                        </div>

                        <div>
                            <h4 className="text-2xl  text-blue-500 font-primary font-bold">
                                Recommendations
                            </h4>
                            <p className="pt-3 text-gray-500 leading-loose text-sm">
                                Recommend freelancers to business based on the matched skill set requirement
                            </p>
                        </div>
                    </div>

                      </div>
                    <div className="mt-2 flex  space-x-2 space-x-reverse ml-2">
            <div className="mt-2 flex space-x-12 mr-4">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan h-16 w-16 rounded-full flex-shrink-0">
                        </div>

                        <div>
                            <h4 className="text-2xl  text-blue-500 font-primary font-bold">
                                Profile Updates 
                            </h4>
                            <p className="pt-3 text-gray-500 leading-loose text-sm">
                                Add new skills to your job profile as you gain over time
                            </p>
                        </div>
                    </div>

                    </div>
                    <div className="mt-6 flex space-x-2 space-x-reverse ml-2">
                   <div className="mt-2 flex space-x-12 mr-4">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan h-16 w-16 rounded-full flex-shrink-0"></div>

                        <div>
                            <h4 className="text-2xl  text-blue-500 font-primary font-bold">
                                Secure
                            </h4>
                            <p className="pt-3 text-gray-500 leading-loose text-sm">
                                User credentials are stored and secured from unauthorized access.
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    </>

  )
}
export default Landing;
