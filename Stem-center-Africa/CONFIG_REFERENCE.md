# SERVICE_DETAIL_CONFIG - Quick Reference

## Configuration Structure

```javascript
export const SERVICE_DETAIL_CONFIG = {
  'service-slug': {
    // SETTINGS
    enableMonthlyPricing: boolean,           // Show monthly toggle?
    customizeDescription: string,            // Customize section subtitle
    ctaPrefix: string,                       // CTA title part 1
    ctaSuffix: string,                       // CTA title part 2
    
    // PACKAGES (Display on Section 1 & Step 1)
    packages: [
      {
        key: string,                         // Unique ID (e.g., 'basic')
        label: string,                       // Display name
        price: number,                       // KSH price
        tier: string,                        // Tier label (e.g., 'Starter')
        description: string,                 // Short description
        isRecommended: boolean,              // Show "RECOMMENDED" badge?
        features: [string, string, ...]      // List of feature strings
      }
    ],
    
    // MODULES (Display on Step 2 - optional add-ons)
    modules: [
      {
        key: string,                         // Unique ID
        label: string,                       // Display name
        price: number,                       // KSH price
        description: string                  // Short description
      }
    ],
    
    // FEATURES (Display on Step 3 - optional add-ons)
    features: [
      {
        key: string,                         // Unique ID
        label: string,                       // Display name
        price: number,                       // KSH price
        description: string                  // Short description
      }
    ]
  }
}
```

---

## Current Services Configuration

### Website Development
```javascript
'website-development': {
  enableMonthlyPricing: true,
  packages: 5 (basic, business, advanced, ecommerce, corporate)
  modules: 2 (mpesa, card)
  features: 6 (booking, dashboard, clientPortal, billing, chat, maps)
}
```

### Software Development
```javascript
'software-development': {
  enableMonthlyPricing: false,
  packages: 3 (basic, business, advanced)
  modules: 2 (apiIntegration, aiFeatures)
  features: 4 (dashboard, userManagement, reporting, notifications)
}
```

### Booking Systems
```javascript
'booking-systems': {
  enableMonthlyPricing: false,
  packages: 3 (basic, business, advanced)
  modules: 2 (mpesa, cardPayment)
  features: 4 (staffPortal, clientPortal, reminders, reviews)
}
```

### AI Automation
```javascript
'ai-automation': {
  enableMonthlyPricing: false,
  packages: 3 (basic, business, advanced)
  modules: 2 (chatbot, voiceAI)
  features: 4 (workflows, analytics, integration, reporting)
}
```

### Mobile Development
```javascript
'mobile-development': {
  enableMonthlyPricing: false,
  packages: 3 (basic, business, advanced)
  modules: 2 (appStore, pushNotifications)
  features: 4 (offlineMode, nativePerformance, analytics, paymentGateway)
}
```

### Digital Marketing
```javascript
'digital-marketing': {
  enableMonthlyPricing: false,
  packages: 3 (basic/starter, business/growth, advanced/accelerator)
  modules: 2 (seoAudit, contentCreation)
  features: 4 (socialAds, searchAds, emailMarketing, analytics)
}
```

---

## How to Modify

### Change a Package Price
```javascript
// In SERVICE_DETAIL_CONFIG['website-development'].packages[0]
{ key: 'basic', price: 20000 } // Change 20000 to new price
```

### Add a New Feature
```javascript
// In SERVICE_DETAIL_CONFIG['software-development'].features
{
  key: 'mlModels',
  label: 'ML MODEL TRAINING',
  price: 55000,
  description: 'Train custom ML models for your domain.'
}
```

### Add a Module for a Service
```javascript
// In SERVICE_DETAIL_CONFIG['booking-systems'].modules
{
  key: 'videoCall',
  label: 'VIDEO CALL INTEGRATION',
  price: 18000,
  description: 'Zoom or Google Meet integration for virtual appointments.'
}
```

### Enable Monthly Pricing for Another Service
```javascript
// In SERVICE_DETAIL_CONFIG['software-development']
enableMonthlyPricing: true,  // Change from false to true
```

---

## CSS Classes - Quick Lookup

### Main Sections
- `.sd-packages-section` - View Packages container
- `.sd-customize-section` - Customize Package container
- `.sd-price-summary` - Right sidebar

### Package Cards
- `.sd-package-card` - Individual package card
- `.sd-package-card.recommended` - Highlighted recommended card
- `.sd-package-button` - CTA buttons

### Customize Form
- `.sd-customize-step` - Each step container
- `.sd-package-option` - Package option button
- `.sd-module-card` - Module checkbox card
- `.sd-feature-card` - Feature checkbox card

### Price Breakdown
- `.sd-summary-breakdown` - Price summary breakdown
- `.sd-breakdown-row` - Individual line item
- `.sd-summary-buttons` - Call-to-action buttons

---

## Color Variables (src/pages/ServiceDetail.css)

```css
--color-primary: #2563eb          /* Blue for active states */
--color-accent: #FF4D9E           /* Pink for highlights *)
--color-dark: #101F3C             /* Dark blue for text *)
--color-dark-bg: #1A0A14          /* Dark background *)
--color-text-secondary: #4A5068   /* Secondary text *)
--color-border: #e5e7eb           /* Light borders *)
--color-warning: #fbbf24          /* Yellow for recommended *)
```

---

## Responsive Breakpoints

```css
@media (max-width: 900px) {
  /* Tablet layout - grid becomes single column */
  .sd-customize-grid    /* 1.8fr 1fr → 1fr */
  .sd-modules-grid      /* 2 cols → 1 col */
  .sd-features-grid     /* 2 cols → 1 col */
}

@media (max-width: 600px) {
  /* Mobile layout - further optimizations */
  /* Font sizes reduced, padding adjusted */
  /* Price summary becomes fluid positioning */
}
```

---

## ServiceDetail.jsx - Key Props Used

```javascript
// From useParams
const { serviceId } = useParams()  // e.g., 'website-development'

// From SERVICE_DETAIL_CONFIG
detailConfig.enableMonthlyPricing  // Show/hide monthly toggle
detailConfig.packages              // Array of packages
detailConfig.modules               // Array of optional modules
detailConfig.features              // Array of optional features
detailConfig.customizeDescription  // Section description
detailConfig.ctaPrefix             // CTA message prefix
detailConfig.ctaSuffix             // CTA message suffix
```

---

## Common Tasks

### Task: Make Software service more expensive
```javascript
'software-development': {
  packages: [
    { key: 'basic', price: 75000 },      // was 50000
    { key: 'business', price: 150000 },  // was 100000
    { key: 'advanced', price: 300000 }   // was 200000
  ]
}
```

### Task: Add 3rd step to Website service
```javascript
'website-development': {
  features: [
    // ... existing 6 features
    {
      key: 'advancedSEO',
      label: 'ADVANCED SEO PACKAGE',
      price: 45000,
      description: 'Comprehensive SEO strategy and implementation.'
    }
  ]
}
```

### Task: Change monthly pricing calculation
```javascript
// In ServiceDetail.jsx
const packagePrice = pricingMode === 'monthly' && detailConfig?.enableMonthlyPricing
  ? Math.round(selectedPackage.price / 12)  // Change 10 to 12 for 12 months
  : selectedPackage.price;
```

---

**Last Updated**: June 10, 2026
**Version**: 1.0
**Status**: Production Ready
