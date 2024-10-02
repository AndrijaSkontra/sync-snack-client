export function calculateOrderSizeBasedOnScreenHeight() {

    const screenHeight = window.innerHeight
    const orderRowHeight = 130
  
    return Math.floor(screenHeight / orderRowHeight)
  }