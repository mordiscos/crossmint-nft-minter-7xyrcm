import axios from 'axios';

const API_KEY = 'your-crossmint-api-key'; // Replace with your actual Crossmint API key
const BASE_URL = 'https://www.crossmint.com/api'; // Production environment URL

interface CreateCollectionResponse {
    id: string;
    actionId: string;
}

interface MintNftResponse {
    id: string;
    actionId: string;
}

async function createCollection(): Promise<CreateCollectionResponse> {
    const url = `${BASE_URL}/2022-06-09/collections/`;
    const body = {
        chain: "ethereum",
        metadata: {
            name: "Sample NFT Collection",
            imageUrl: "https://www.crossmint.com/assets/crossmint/logo.png",
            description: "This is a sample NFT collection",
            symbol: "XMINT"
        },
        fungibility: "non-fungible",
        supplyLimit: 1000
    };
    const headers = {
        'X-API-KEY': API_KEY
    };

    try {
        const response = await axios.post(url, body, { headers });
        return response.data;
    } catch (error) {
        console.error('Error creating collection:', error);
        throw error;
    }
}

async function mintNft(collectionId: string): Promise<MintNftResponse> {
    const url = `${BASE_URL}/2022-06-09/collections/${collectionId}/nfts`;
    const body = {
        recipient: "email:testy@crossmint.io:ethereum",
        metadata: {
            name: "Crossmint Example NFT",
            image: "https://www.crossmint.com/assets/crossmint/logo.png",
            description: "My NFT created via the mint API!",
        }
    };
    const headers = {
        'X-API-KEY': API_KEY
    };

    try {
        const response = await axios.post(url, body, { headers });
        return response.data;
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
}

async function main() {
    try {
        console.log('Creating NFT collection...');
        const collection = await createCollection();
        console.log('Collection created with ID:', collection.id);

        console.log('Minting NFT...');
        const nft = await mintNft(collection.id);
        console.log('NFT minted with ID:', nft.id);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
