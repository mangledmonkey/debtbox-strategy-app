import type { RequestHandler } from '@sveltejs/kit';
import type { Address } from 'viem';
import { db } from '$lib/server/db'
import { walletsTable, type UserWallet } from '$lib/server/db/schema/wallets'
import { eq } from 'drizzle-orm';
// import { drizzle } from 'drizzle-orm/better-sqlite3'


export const POST: RequestHandler = async (requestEvent) => {
    // console.log("🚀 ~ requestEvent:", requestEvent)
	const { request } = requestEvent;
    // console.log("🚀 ~ request:", request)

	const body = await request.json();
    console.log("🚀 ~ /api/v1/usr/wallets:POST ~ body:", body)
    // console.log("🚀 ~ constPOST:RequestHandler= ~ body:", body)
    const userAddress: Address = body.userAddress;
    // console.log("🚀 ~ constPOST:RequestHandler= ~ userAddress:", userAddress)
    // console.log("🚀 ~ constPOST:RequestHandler= ~ body.includeUser:", body.includeUser)
	const includeUser: string = body.includeUser || 'true';
    // console.log("🚀 ~ constPOST:RequestHandler= ~ includeUser:", includeUser)

	const wallets: Address[] = []
	if (includeUser === 'true') wallets.push(userAddress);

	// Get the user's additional wallets
	try {
		const userWallets: UserWallet[] = await db.select()
			.from(walletsTable)
			.where(eq(walletsTable.userAddress, userAddress));
		// console.log("🚀 ~ constPOST:RequestHandler= ~ userWallets:", userWallets)
		if (userWallets) {
			Object.keys(userWallets).forEach((key) => {
				wallets.push(userWallets[Number(key)].address)
			})
		}
	} catch (error){
		console.error("🚀 ~ /api/v1/usr/wallets:POST ~ error:", error)
	}

	return new Response(JSON.stringify(wallets), { status: 201 });
};