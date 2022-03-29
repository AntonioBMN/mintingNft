import { pinFileToIPFS } from "./pinata";

export const pinFile = async (file) => {
    let pinataResponse = await pinFileToIPFS(file);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  return pinataResponse
}

export const json = (name, pinImage, externalLink, description, propriedades, levels, stats) => {
    let attributes = []
    if (propriedades != null || propriedades != undefined) {
        propriedades.forEach(element => {
            attributes.push(element)
        });
    }

    if(levels != null || levels != undefined) {
        levels.forEach(element => {
            attributes.push(element)
        });
    }
    if(stats != null || stats != undefined) {
        stats.forEach(element => {
            attributes.push(element)
        });
    }

    
    let metadata = {
        'name': name,
        'description': description,
        'image': pinImage,
        'external_url': externalLink,
        'attributes': attributes
    }
    return metadata
}