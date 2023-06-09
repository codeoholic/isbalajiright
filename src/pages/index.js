import React from "react"
import { ArrowLongDownIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { differenceInDays } from "date-fns"

const Home = ( props ) => {

	let { price, price_at_timestamp, days_since } = props
	let days_since_array = days_since.toString().split("")
	const [ state, updateState ] = React.useState({

		change_percentage: (( price - price_at_timestamp )/price_at_timestamp*100).toFixed(2),
		percentage: ((+price - price_at_timestamp)/10000).toFixed(2),
		price: price,

	})
	React.useEffect( () => {

		const interval = setInterval( async () => {

			const data = await fetch("https://blockchain.info/ticker")
			const response = await data.json()
			const usd_price = response.USD.last
			updateState({

				price: usd_price,
				change_percentage: (( usd_price - price_at_timestamp )/price_at_timestamp*100).toFixed(2),
				percentage: ((+usd_price - price_at_timestamp)/10000).toFixed(2),

			})

		}, 30000)

		return () => {

			clearInterval( interval )

		}

	}, [])

	return (
		<div>
			<Head>

				{/* <!-- Primary Meta Tags --> */}
				<title>{ "Is Balaji right? | " + state.price.toLocaleString() }</title>
				<meta name="title" content="Is Balaji right?"/>
				<meta name="description" content="Price of Bitcoin is going to cross $1M in the next 90 days due to Hyperinflation."/>

				{/* <!-- Open Graph / Facebook --> */}
				<meta property="og:type" content="website"/>
				<meta property="og:url" content="https://isbalajiright.com/"/>
				<meta property="og:title" content="Is Balaji right?"/>
				<meta property="og:description" content="Price of Bitcoin is going to cross $1M in the next 90 days due to Hyperinflation."/>
				<meta property="og:image" content="https://internetstore.b-cdn.net/isbalajiright/meta.jpg"/>

				{/* <!-- Twitter --> */}
				<meta property="twitter:card" content="summary_large_image"/>
				<meta property="twitter:url" content="https://isbalajiright.com/"/>
				<meta property="twitter:title" content="Is Balaji right?"/>
				<meta property="twitter:description" content="Price of Bitcoin is going to cross $1M in the next 90 days due to Hyperinflation."/>
				<meta property="twitter:image" content="https://internetstore.b-cdn.net/isbalajiright/meta.jpg"/>

			</Head>
			<div className="flex items-center justify-between flex-col h-view h-screen bg-gradient-to-br from-gray-700 to-gray-900 px-5 sm:px-0">
				<div className="p-10">
					<h1 className="text-3xl font-bold text-zinc-50">Is Balaji right?</h1>
				</div>
				<div className="text-center">
					<div className="text-6xl font-semibold text-zinc-50">${ state.price.toLocaleString() }</div>
					<div className="mt-2.5">
						<div className={` ${ state.change_percentage > 0 ? "text-green-700" : "text-red-700" } text-xl font-semibold`}>{ state.change_percentage > 0 ? "+" : "" }{ state.change_percentage }%</div>
						<div className="text-zinc-50 italic text-sm"><span className="line-through">Since Balaji's bet</span>. The bet is not yet officially accepted.</div>
						<div className="text-zinc-50 italic text-sm">Change percentage since he proposed the bet terms.</div>
						<div className="mt-2.5">
						<div className="text-zinc-50 text-lg">${ price_at_timestamp.toLocaleString() }</div>
							<div className="mt-2.5">
								<div className="text-zinc-50 italic text-xs">as on March 17th 2023, 18:30UTC</div>
							</div>
						</div>
						<div className="flex gap-1 mt-5 flex justify-center">
							{

								days_since_array.map( ( character, character_index ) => {

									return (
										<div className="bg-white w-16 font-semibold text-5xl text-zinc-700 h-20 flex items-center justify-center rounded" key={ character_index }>{ character }</div>
									)

								})

							}
						</div>
						<div className="text-zinc-50 text-sm mt-2.5">Days since proposed</div>
						<div className="text-left">
							<div className="mt-5 flex items-center gap-5">
								<div className="relative w-72 sm:w-96 h-8 bg-purple-400 rounded-sm">
									<div className={`absolute left-0 top-0 bg-purple-600 h-full rounded-sm`} style={{ width: state.percentage+"%" }}></div>
								</div>
								<div className="text-zinc-50 text-sm">{ state.percentage }%</div>
							</div>
							<div className="mt-1 flex gap-2.5 items-center">
								<div className="text-zinc-50 text-sm">towards $1M</div>
								<ArrowLongRightIcon className="w-4 h-4 text-zinc-50"/>
							</div>
						</div>
					</div>
				</div>
				<div className="p-10 items-center flex flex-col">
					<div className="text-zinc-50 text-lg">What's the bet?</div>
					<ArrowLongDownIcon className="w-6 h-6 text-zinc-50 mt-2.5"/>
				</div>
			</div>
			<div className="grid h-view place-items-center bg-gray-900 p-5 text-center">
				<div className="mt-24">
					<div className="text-zinc-50 text-2xl">Price of Bitcoin is going to cross $1M in the next 90 days due to Hyperinflation.</div>
				</div>
				<div className="mt-10 w-full flex justify-center">
					<blockquote className="twitter-tweet"><p lang="en" dir="ltr">I will take that bet.<br/>You buy 1 BTC.<br/>I will send $1M USD.<br/>This is ~40:1 odds as 1 BTC is worth ~$26k.<br/>The term is 90 days.<br/>All we need is a mutually agreed custodian who will still be there to settle this in the event of digital dollar devaluation.<br/>If someone knows how to do this… <a href="https://t.co/tcuBNd679T">https://t.co/tcuBNd679T</a> <a href="https://t.co/6Aav9KeJpe">pic.twitter.com/6Aav9KeJpe</a></p>&mdash; Balaji (@balajis) <a href="https://twitter.com/balajis/status/1636797265317867520?ref_src=twsrc%5Etfw">March 17, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
				</div>
				<div className="flex items-center gap-5 mt-10">
					<Link href="https://github.com/codeoholic/isbalajiright" target="_blank">
						<div className="relative w-8 h-8">
							<Image
								src="/github.svg"
								fill
								unoptimized
								alt="github icon"
							/>
						</div>
					</Link>
					<Link href="https://twitter.com/mohit.dev" target="_blank">
						<div className="relative w-8 h-8">
							<Image
								src="/twitter.svg"
								fill
								unoptimized
								alt="github icon"
							/>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)

}

export const getServerSideProps = async ( context ) => {

	const data = await fetch("https://blockchain.info/ticker")
	const response = await data.json()
	const price_at_timestamp = 26497.9
	const usd_price = response.USD.last
	const days_since = differenceInDays(

		new Date(),
		new Date(2023, 2, 17, 18, 30)

	)
	return {

		props: {

			days_since,
			price_at_timestamp: price_at_timestamp,
			price: usd_price,

		},

	}

}

export default Home
