import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//scene
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000);
//render
const render = new THREE.WebGLRenderer({
    canvas:document.querySelector('#bg')
})
render.setPixelRatio(window.devicePixelRatio)
render.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(0)

render.render(scene,camera)
//torus
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347 })
const torus = new THREE.Mesh( geometry, material )
scene.add(torus)

//lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientLight)

//help light
/*const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera,render.domElement)*/
//Stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25,24,24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry,material)

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))
    star.position.set(x,y,z)
    scene.add(star)
}
Array(200).fill().forEach(addStar)
//Loader
const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg')
scene.background = spaceTexture
//Texture Mapping
const salvoTexture = new THREE.TextureLoader().load('assets/salvo.jpg')
const salvo = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({ map: salvoTexture })
)
scene.add(salvo)
//Moon
const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('assets/normal.png')

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
)
scene.add(moon)
moon.position.z = 30
moon.position.setX(-10)
//Move Camera
function moveCamera() {
    const t = document.body.getBoundingClientRect().top

    moon.rotation.x += 0.05
    moon.rotation.y += 0.075
    moon.rotation.z += 0.05

    salvo.rotation.y += 0.01
    salvo.rotation.z += 0.01

    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.position.y = t * -0.0002

}
document.body.onscroll = moveCamera
//Animation
function animate() {
    requestAnimationFrame(animate)

    torus.rotateX(0.01)
    torus.rotateY(0.005)
    torus.rotateZ(0.01)

    moon.rotateY(0.01)


    //controls.update()

    render.render(scene,camera)
}

animate()