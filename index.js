const isMarkerFounded = {
  m_santa: false,
  m_boushi: false,
  m_huku: false,
}

const isVisibled = {
  m_boushi: false,
  m_huku: false,
}

let isComplete = false

AFRAME.registerComponent('run', {
  init: () => {
    // this.santa = document.getElementById('m_santa')
    // this.boushi = document.getElementById('m_boushi')
    // this.huku = document.getElementById('m_huku')

    // this.p_santa = new THREE.Vector3()
    // this.p_boushi = new THREE.Vector3()
    // this.p_huku = new THREE.Vector3()

    document.querySelectorAll('a-marker').forEach(marker => {
      marker.addEventListener('markerFound', () => {
        isMarkerFounded[marker.id] = true
      })
      marker.addEventListener('markerLost', () => {
        isMarkerFounded[marker.id] = false
      })
    })
  },

  tick: () => {
    if(!isMarkerFounded.m_santa) return

    if(isMarkerFounded.m_boushi && !isVisibled.m_boushi) {
      // this.santa.object3D.getWorldPosition(this.p_santa)
      // this.boushi.object3D.getWorldPosition(this.p_boushi)

      // const distance = this.p_santa.distanceTo(this.p_boushi)
      // this.boushi.setAttribute('position', `${this.p_santa.x} ${this.p_santa.y} ${this.p_santa.z}`)
      document.getElementById('boushi').setAttribute('gltf-model', '#santa_boushi')
      isVisibled.m_boushi = true
      return
    }
    if(isMarkerFounded.m_huku && !isVisibled.m_huku) {
      document.getElementById('huku').setAttribute('gltf-model', '#santa_huku')
      isVisibled.m_huku = true
      return
    }
    if(isMarkerFounded.m_boushi && isMarkerFounded.m_huku && !isComplete) {
      document.getElementById('message').setAttribute('opacity', '1')
      isComplete = true
    }
  }
})
