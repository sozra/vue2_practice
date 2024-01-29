<template>
  <div v-for="card in cards" :key="card.heading" class="cards__card card">
    <h2 class="card__heading">{{ card.heading }}</h2>
    <p class="card__price">{{ card.price }}</p>
    <ul role="list" class="card__bullets flow">
      <li v-for="feature in card.features" :key="feature">{{ feature }}</li>
    </ul>
    <a :href="card.link" class="card__cta cta">{{ card.cta }}</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          heading: 'Basic',
          price: '$9.99',
          features: ['Access to standard workouts and nutrition plans', 'Email support'],
          link: '#basic',
          cta: 'Get Started'
        },
        {
          heading: 'Pro',
          price: '$19.99',
          features: ['Access to advanced workouts and nutrition plans', 'Priority Email support', 'Exclusive access to live Q&A sessions'],
          link: '#pro',
          cta: 'Upgrade to Pro'
        },
        {
          heading: 'Ultimate',
          price: '$29.99',
          features: ['Access to all premium workouts and nutrition plans', '24/7 Priority support', '1-on-1 virtual coaching session every month', 'Exclusive content and early access to new features'],
          link: '#ultimate',
          cta: 'Go Ultimate'
        }
      ]
    }
  }
}
</script>