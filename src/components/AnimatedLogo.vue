<template>
  <svg
    class="animated-logo"
    viewBox="0 0 200 80"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
      </linearGradient>

      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <g class="logo-group">
      <text x="10" y="55" class="logo-text main-text" fill="url(#gradient1)" filter="url(#glow)">
        MUH
      </text>

      <circle cx="125" cy="45" r="8" class="logo-dot" fill="url(#gradient1)">
        <animate
          attributeName="r"
          values="8;12;8"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.6;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      <text x="145" y="55" class="logo-text dev-text" fill="url(#gradient1)" filter="url(#glow)">
        dev
      </text>
    </g>

    <path
      class="underline"
      d="M 10 60 L 190 60"
      stroke="url(#gradient1)"
      stroke-width="2"
      fill="none"
      stroke-dasharray="180"
      stroke-dashoffset="180"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="180"
        to="0"
        dur="1.5s"
        fill="freeze"
      />
    </path>
  </svg>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.animated-logo {
  width: 200px;
  height: 80px;

  .logo-text {
    font-family: "Basier Mono", monospace;
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 2px;
    animation: textGlow 3s ease-in-out infinite alternate;
  }

  .main-text {
    animation-delay: 0s;
  }

  .dev-text {
    animation-delay: 0.5s;
    font-size: 32px;
  }

  .logo-dot {
    filter: url(#glow);
  }

  .logo-group {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes textGlow {
    from {
      filter: drop-shadow(0 0 2px rgba(102, 126, 234, 0.5));
    }
    to {
      filter: drop-shadow(0 0 8px rgba(118, 75, 162, 0.8));
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
}
</style>
