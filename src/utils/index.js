
export const  epochToHumanReadableForm = (date) =>{
    var myDate = new Date(date *1000);
    return myDate.toLocaleString()
  }
export const truncateString = (str, num)=>{
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }
export const getRandomInt=(max) =>{
  return Math.floor(Math.random() * max);
}

 export const accounts = ["FrdL1M386D7Jcxhcn81pv3WBH4RGESDZziv33dB3Dcdg","A6oomfmY99sEGUB8Rwr5Cc2VsRkAS6mj1MoN6J7VSy5G","AKY3ReZtgduR33hK3F6cZ4oUUiEeNdf28RAYo4mV4gAN","A9BZ5kjh7iKu7SMzA5WUF31Zst9V7fehwDZaoKs4NpSi","yTM5APEbWb1GBBtgsjzTF6ZYw5pWxqCr7qKykWW7qLS","9LoXaUQav7XRQndyrJLoprMkn7UWhPEwZpmQMUvMEvoE","54rui3MiuVPdXTZhmAfJfiP79vHXHx25FhKf7A9ADsk","F3Tt6Uq5cCVGafKVPoxZhaR6gA3VY522zaqX9HLSzKo3" ,"4zZYS64inSu1urexN7zEZFkxDYbH3vvqitCB5Cq49ZBN","BCNi5G9tco6Zf7TmmaLEWnTYHfZpfDBL4KjuPRiCCpaJ","HxXWES3YuEFT7n5qr7JCFcnPwSHmVfjSUEJfvb6WhhbG","HJ7yggqudzonJTqxVVXwqApf2uJU7pJe1MwjU8nSMCBd","D9sZJr9NigCs93H4qXVEJhyArNMPaUgRVXnsvjWHcnfo","9pKgd5f5VSnszb2NHH19Ewrjz5fsHTTn3pBGruRpggwx","5uP4wQt76mEmyyfwkAffarVaCddvc4Y3dAfJFRWewgBk","5jHmfj2d3o125uBy6ENYhujUpTcCJ66iBkjTU4tbr3d3","4NzKmH4zQS2bGHRfqZVGWEKpdAAEvkZNPVjY8wGNmAdV","D9pvLPFUVywm8x3GUW2Zn5Me6svraVAnyDvoQQURCATW","GLpzNHMpb7vYH98VkGuUKcgPETsDWFcdwNscJypyDbtz","5HNtipZjTpnuEcZQD4eqmhT2CLiJNU5QbiqtC8tEs7r1","2kGwucNRC14MSJtqNRR6vBPt19sZaydFmuHfMURCvKps","DoCJAzAHdNSGmzEUYhpcDuhuPGbppG4qmwjqxpnMj43u","5PTTb8TBgRFPPg4T2TFnf2og6trXAygWYE1RPFiZPZ1h","8ySdj6R3FXSdCKUHmXGtqjf4FSFWd8xGJrtGtGLvRYY1","6Y7HG1cWWhgS1jiagpi5YQQLsmvuGsUTyt6ETcuERX3t"]