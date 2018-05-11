const CAROUSEL_DATA = [
  {text: 'one', bgColor: 'red', navItem: [
    {text: 'zero a', bgColor: 'red'},
    {text: 'zero b', bgColor: 'green'},
    {text: 'zero c', bgColor: 'blue'},
    {text: 'zero d', bgColor: 'orange'},
    {text: 'zero e', bgColor: 'purple'}
  ]},
  {text: 'two', bgColor: 'green', navItem: [
    {text: 'one a', bgColor: 'red'},
    {text: 'one b', bgColor: 'green'},
    {text: 'one c', bgColor: 'blue'},
    {text: 'one d', bgColor: 'orange'},
    {text: 'one e', bgColor: 'purple'}
  ]},
  {text: 'three', bgColor: 'blue', navItem: [
    {text: 'two a', bgColor: 'red'},
    {text: 'two b', bgColor: 'green'},
    {text: 'two c', bgColor: 'blue'},
    {text: 'two d', bgColor: 'orange'},
    {text: 'two e', bgColor: 'purple'}
  ]},
  {text: 'four', bgColor: 'orange', navItem: [
    {text: 'three a', bgColor: 'red'},
    {text: 'three b', bgColor: 'green'},
    {text: 'three c', bgColor: 'blue'},
    {text: 'three d', bgColor: 'orange'},
    {text: 'three e', bgColor: 'purple'}
  ]},
  {text: 'six', bgColor: 'purple', navItem: [
    {text: 'four a', bgColor: 'red'},
    {text: 'four b', bgColor: 'green'},
    {text: 'four c', bgColor: 'blue'},
    {text: 'four d', bgColor: 'orange'},
    {text: 'four e', bgColor: 'purple'}
  ]}
]

let carouselContainer = document.getElementById('carouselContainer')
let visibleHorizontalIndexes = {lefter: 4, left: 3, center: 2, right: 1, righter: 0}
let visibleVerticalIndexes = []
let carouselVisibleItems
let lefterColumnNavItems
let leftColumnNavItems
let centerColumnNavItems
let rightColumnNavItems
let righterColumnNavItems


//----------------------------------------------------------------------MANAGERS
//initialize
document.addEventListener('DOMContentLoaded', function(event) {
  for(let navCategory of CAROUSEL_DATA) {
    visibleVerticalIndexes.push({downer: 4, down: 3, center: 2, up: 1, upper: 0})
  }

  render()
})


function render() {
  updateCarouselState()
  removeCarouselCells()
  removeCarouselColumns()
  makeCarouselColumns()
  makeCarouselCells()
  updateCarouselState()
  populateCarouselColumns()
  populateCarouselCells()
  updateCarouselState()
}


function left() {
  for(let i = 0; i < carouselVisibleItems.length; i++) {
    carouselVisibleItems[i].classList.add('movedLeft')
  }

  decHoriz()
  updateCarouselState()
}


function right() {
  for(let i = 0; i < carouselVisibleItems.length; i++) {
    carouselVisibleItems[i].classList.add('movedRight')
  }

  incHoriz()
  updateCarouselState()
}


function up() {
  for(let i = 0; i < centerColumnNavItems.length; i++) {
    centerColumnNavItems[i].classList.add('movedUp')
  }

  incVert()
  updateCarouselState()
}


function down() {
  for(let i = 0; i < centerColumnNavItems.length; i++) {
    centerColumnNavItems[i].classList.add('movedDown')
  }

  decVert()
  updateCarouselState()
}


//-----------------------------------------------------------------------HELPERS
function removeCarouselColumns() {
  while(carouselContainer.firstChild) {
    carouselContainer.removeChild(carouselContainer.firstChild)
  }
}


function removeCarouselCells() {
  for(let i = 0; i < carouselVisibleItems.length; i++) {
    while(carouselVisibleItems[i].firstChild) {
      carouselVisibleItems[i].removeChild(carouselVisibleItems[i].firstChild)
    }
  }
}


function makeCarouselColumns() {
  for(let i = 0; i < 5; i++) {
    let newElement = document.createElement('div')
    newElement.classList.add('carouselItem')
    newElement.addEventListener('transitionend', render)
    carouselContainer.appendChild(newElement)
  }
}


function makeCarouselCells() {
  for(let i = 0; i < 5; i++) {
    for(let j = 0; j < 5; j++) {
      let newElement = document.createElement('div')
      newElement.classList.add('navItem')
      newElement.addEventListener('transitionend', render)
      carouselVisibleItems[j].appendChild(newElement)
    }
  }
}


function updateCarouselState() {
  carouselVisibleItems = document.getElementsByClassName('carouselItem')
  lefterColumnNavItems = document.querySelectorAll('.carouselItem:nth-of-type(1n) .navItem')
  leftColumnNavItems = document.querySelectorAll('.carouselItem:nth-of-type(2n) .navItem')
  centerColumnNavItems = document.querySelectorAll('.carouselItem:nth-of-type(3n) .navItem')
  rightColumnNavItems = document.querySelectorAll('.carouselItem:nth-of-type(4n) .navItem')
  righterColumnNavItems = document.querySelectorAll('.carouselItem:nth-of-type(5n) .navItem')
}


function incHoriz() {
  for(let prop in visibleHorizontalIndexes) {
    visibleHorizontalIndexes[prop] = visibleHorizontalIndexes[prop] === CAROUSEL_DATA.length - 1 ? 0 : visibleHorizontalIndexes[prop] + 1
  }
}


function decHoriz() {
  for(let prop in visibleHorizontalIndexes) {
    visibleHorizontalIndexes[prop] = visibleHorizontalIndexes[prop] === 0 ? CAROUSEL_DATA.length - 1 : visibleHorizontalIndexes[prop] - 1
  }
}


function incVert() {
  for(let prop in visibleVerticalIndexes[visibleHorizontalIndexes.center]) {
    visibleVerticalIndexes[visibleHorizontalIndexes.center][prop] = visibleVerticalIndexes[visibleHorizontalIndexes.center][prop] === CAROUSEL_DATA[2].navItem.length - 1 ? 0 : visibleVerticalIndexes[visibleHorizontalIndexes.center][prop] + 1
  }
}


function decVert() {
  for(let prop in visibleVerticalIndexes[visibleHorizontalIndexes.center]) {
    visibleVerticalIndexes[visibleHorizontalIndexes.center][prop] = visibleVerticalIndexes[visibleHorizontalIndexes.center][prop] === 0 ? CAROUSEL_DATA[2].navItem.length - 1 : visibleVerticalIndexes[visibleHorizontalIndexes.center][prop] - 1
  }
}


function populateCarouselColumns() {
  let i = 0
  for(let prop in CAROUSEL_DATA[visibleHorizontalIndexes]) {
    carouselVisibleItems[i].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes[prop]].bgColor
    i++
  }
}


function populateCarouselCells() {
  


  lefterColumnNavItems[1].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.lefter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.lefter].up].bgColor
  lefterColumnNavItems[2].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.lefter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.lefter].center].bgColor
  lefterColumnNavItems[3].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.lefter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.lefter].down].bgColor

  lefterColumnNavItems[1].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.lefter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.lefter].up].text
  lefterColumnNavItems[2].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.lefter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.lefter].center].text
  lefterColumnNavItems[3].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.lefter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.lefter].down].text



  leftColumnNavItems[1].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.left].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.left].up].bgColor
  leftColumnNavItems[2].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.left].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.left].center].bgColor
  leftColumnNavItems[3].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.left].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.left].down].bgColor

  leftColumnNavItems[1].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.left].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.left].up].text
  leftColumnNavItems[2].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.left].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.left].center].text
  leftColumnNavItems[3].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.left].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.left].down].text



  centerColumnNavItems[0].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.center].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.center].upper].bgColor
  centerColumnNavItems[1].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.center].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.center].up].bgColor
  centerColumnNavItems[2].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.center].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.center].center].bgColor
  centerColumnNavItems[3].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.center].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.center].down].bgColor
  centerColumnNavItems[4].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.center].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.center].downer].bgColor

  centerColumnNavItems[0].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.center].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.center].upper].text
  centerColumnNavItems[1].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.center].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.center].up].text
  centerColumnNavItems[2].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.center].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.center].center].text
  centerColumnNavItems[3].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.center].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.center].down].text
  centerColumnNavItems[4].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.center].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.center].downer].text



  rightColumnNavItems[1].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.right].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.right].up].bgColor
  rightColumnNavItems[2].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.right].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.right].center].bgColor
  rightColumnNavItems[3].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.right].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.right].down].bgColor

  rightColumnNavItems[1].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.right].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.right].up].text
  rightColumnNavItems[2].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.right].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.right].center].text
  rightColumnNavItems[3].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.right].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.right].down].text



  righterColumnNavItems[1].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.righter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.righter].up].bgColor
  righterColumnNavItems[2].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.righter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.righter].center].bgColor
  righterColumnNavItems[3].style.backgroundColor = CAROUSEL_DATA[visibleHorizontalIndexes.righter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.righter].down].bgColor

  righterColumnNavItems[1].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.righter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.righter].up].text
  righterColumnNavItems[2].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.righter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.righter].center].text
  righterColumnNavItems[3].innerHTML = CAROUSEL_DATA[visibleHorizontalIndexes.righter].navItem[visibleVerticalIndexes[visibleHorizontalIndexes.righter].down].text
}
