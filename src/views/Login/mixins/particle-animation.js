import * as THREE from 'three'

export default {
  data() {
    return {
      windowHalfX: 0,
      windowHalfY: 0,
      camera: null,
      renderer: null,
      amountX: 60,
      amountY: 40,
      particle: 0,
      particles: 0,
      count: 0,
      SEPARATION: 100,
      mouseX: 0,
      mouseY: 0
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  destroyed() {
    window.removeEventListener('resize', this.onWindowResize, false)
  },
  methods: {
    init() {
      this.camera = new THREE.PerspectiveCamera(
        120,
        this.$refs['loginCanvas'].clientWidth / this.$refs['loginCanvas'].clientHeight,
        1,
        1500
      )		// 创建透视相机设置相机角度大小等
      this.camera.position.set(0, 450, 2000)		// 设置相机位置

      this.scene = new THREE.Scene()			// 创建场景
      this.particles = []

      const PI2 = Math.PI * 2
      // 设置粒子的大小，颜色位置等
      const material = new THREE.ParticleCanvasMaterial({
        color: 0x0f96ff,
        vertexColors: true,
        size: 1,
        program: function(context) {
          context.beginPath()
          context.arc(0, 0, 0.01, 0, PI2, true)	// 画一个圆形。此处可修改大小。
          context.fill()
        }
      })
      // 设置长条粒子的大小颜色长度等
      const materialY = new THREE.ParticleCanvasMaterial({
        color: 0xffffff,
        vertexColors: true,
        size: 1,
        program: function(context) {
          context.beginPath()
          // 绘制渐变色的矩形
          const lGrd = context.createLinearGradient(-0.008, 0.25, 0.016, -0.25)
          lGrd.addColorStop(0, '#16eff7')
          lGrd.addColorStop(1, '#0090ff')
          context.fillStyle = lGrd
          context.fillRect(-0.008, 0.25, 0.016, -0.25) // 注意此处的坐标大小
          // 绘制底部和顶部圆圈
          context.fillStyle = '#0090ff'
          context.arc(0, 0, 0.008, 0, PI2, true) // 绘制底部圆圈
          context.fillStyle = '#16eff7'
          context.arc(0, 0.25, 0.008, 0, PI2, true) // 绘制顶部圆圈
          context.fill()
          context.closePath()
          // 绘制顶部渐变色光圈
          const rGrd = context.createRadialGradient(0, 0.25, 0, 0, 0.25, 0.025)
          rGrd.addColorStop(0, 'transparent')
          rGrd.addColorStop(1, '#16eff7')
          context.fillStyle = rGrd
          context.arc(0, 0.25, 0.025, 0, PI2, true) // 绘制一个圆圈
          context.fill()
        }
      })

      // 循环判断创建随机数选择创建粒子或者粒子条
      let i = 0
      for (let ix = 0; ix < this.amountX; ix++) {
        for (let iy = 0; iy < this.amountY; iy++) {
          const num = Math.random() - 0.1
          if (num > 0) {
            this.particle = this.particles[i++] = new THREE.Particle(material)
            // console.log("material")
          } else {
            this.particle = this.particles[i++] = new THREE.Particle(materialY)
            // console.log("materialY")
          }
          // particle = particles[ i ++ ] = new THREE.Particle( material );
          this.particle.position.x = ix * this.SEPARATION - ((this.amountX * this.SEPARATION) / 2)
          this.particle.position.z = iy * this.SEPARATION - ((this.amountY * this.SEPARATION) / 2)
          this.scene.add(this.particle)
        }
      }

      this.renderer = new THREE.CanvasRenderer()
      this.renderer.setSize(
        document.querySelector('.login-canvas').clientWidth,
        document.querySelector('.login-canvas').clientHeight
      )
      this.$refs['loginCanvas'].appendChild(this.renderer.domElement)
      // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
      // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
      // document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      window.addEventListener('resize', this.onWindowResize, false)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.render()
    },
    // 浏览器大小改变时重新渲染
    onWindowResize() {
      const loginCanvas = this.$refs['loginCanvas']

      this.windowHalfX = loginCanvas.clientWidth / 2
      this.windowHalfY = loginCanvas.clientHeight / 2
      this.camera.aspect = loginCanvas.clientWidth / loginCanvas.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(loginCanvas.clientWidth, loginCanvas.clientHeight)
    },
    render() {
      let i = 0
      // 更新粒子的位置和大小
      for (let ix = 0; ix < this.amountX; ix++) {
        for (let iy = 0; iy < this.amountY; iy++) {
          this.particle = this.particles[i++]
          // 更新粒子位置
          this.particle.position.y = (Math.sin((ix + this.count) * 0.3) * 600) +
            (Math.sin((iy + this.count) * 0.5) * 50)
          // 更新粒子大小
          this.particle.scale.x =
            this.particle.scale.y =
              this.particle.scale.z =
                ((Math.sin((ix + this.count) * 0.3) + 1) * 4 +
                  (Math.sin((iy + this.count) * 0.5) + 1) * 4) * 30 // 正常情况下再放大100倍*1200
        }
      }

      this.renderer.render(this.scene, this.camera)
      this.count += 0.05
    }
  }
}
