<script setup lang="ts">
import heroImageSrc from '@/assets/images/hero-editorial-dining.png?url'
</script>

<template>
  <main>
    <section class="hero is-fullheight app-hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered reverse-columns">
            <div class="column is-10-mobile is-10-tablet is-5-desktop is-5-widescreen is-5-fullhd">
              <p class="subtitle is-6 has-text-weight-semibold app-hero__kicker">ToEat</p>
              <h1 class="title is-1 mb-4 app-hero__title app-font-display">
                The notebook for tables you have not booked yet.
              </h1>
              <p class="app-hero__lead">
                Keep restaurants and dishes in one calm list — the way a dining room keeps its menu short and honest. No
                noise, only what you want to try, recommend, or skip.
              </p>
              <div class="buttons">
                <router-link to="/restaurants" class="button is-primary is-medium">See restaurants</router-link>
                <router-link to="/restaurants?new=true" class="button is-medium is-outlined">Add a place</router-link>
              </div>
            </div>
            <div class="column is-10-mobile is-10-tablet is-4-desktop is-7-widescreen is-4-fullhd is-offset-1-fullhd">
              <figure class="image is-square app-hero__figure">
                <img
                  :src="heroImageSrc"
                  alt="Editorial photograph of a plated fine dining dish in warm low light"
                  width="520"
                  height="520"
                  loading="eager"
                  fetchpriority="high"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style></style>
