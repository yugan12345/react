function customRendor (reactElement,container){
    const  newElement = document.createElement (reactElement.type)
    newElement.textContent= reactElement.children
    for (const  prop in reactElement.props){
        if(prop ==='children') continue
        newElement.setAttribute (prop,reactElement.props [prop])
    }
    container.appendChild (newElement)
}
const  reactElement ={
    type:'a',
    props: {
        href:'https://www.google.com',
        target:'_blank',
    },
    children:'click me to visit google'
}
const mainContainer =document.querySelector('#root')
customRendor (reactElement,mainContainer)