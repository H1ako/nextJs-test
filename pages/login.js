import {getProviders, signIn} from 'next-auth/react'

function Login({providers}) {
    return (
        <div className='bg-black text-2xl flex flex-col justify-center items-center h-screen text-white'>
            <h1>Login Page</h1>
            <img className='mt-5 w-[300px]' src="https://links.papareact.com/9xl" alt="" />
            {Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id, {callbackUrl: '/'})} className='mt-5 bg-[#18D860] text-white rounded-full p-3'>Login With {provider.name}</button>
                </div>
            ))}
        </div>
    )
}

export default Login
export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers: providers
        }
    }
}