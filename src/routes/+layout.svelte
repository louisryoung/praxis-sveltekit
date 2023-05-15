<script>
  import { browser } from '$app/environment';
  import { checkDarkMode } from '$lib/utils/darkMode';
  import '@github/relative-time-element';
  import '../app.css';

  if (browser) {
    checkDarkMode();
  }
</script>

<slot />
