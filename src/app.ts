import {
    TodoBoostrapTheme,
    TodoBulmaTheme,
    TodoFoudationTheme,
    // TodoMaterializeTheme,
    TodoTailwindTheme,
    TodoComponent
  } from "./components/todo";
  
  const themes = {
    bootstrap: TodoBoostrapTheme,
    bulma: TodoBulmaTheme,
    foundation: TodoFoudationTheme,
    // materialize: TodoMaterializeTheme,
    tailwind: TodoTailwindTheme
  } as const;
  
  type ThemeKey = keyof typeof themes;
  
  const cssPathsInline = {
    bootstrap: './css/bootstrap.scss?inline',
    bulma: './css/bulma.scss?inline',
    foundation: './css/foundation.scss?inline',
    materialize: './css/materialize.scss?inline',
    tailwind: './css/tailwind.css?inline'
  } as const;
  
  const DEFAULT_THEME: ThemeKey = 'foundation';
  
  async function loadThemeStyles(theme: ThemeKey) {
    document.querySelectorAll('style[data-dynamic-style]').forEach((el) => el.remove());
  
    const cssPath = cssPathsInline[theme];
    if (cssPath) {
      const cssModule = await import(cssPath);
      const styleEl = document.createElement('style');
      styleEl.setAttribute('data-dynamic-style', theme);
      styleEl.textContent = cssModule.default;
      document.head.appendChild(styleEl);
    }
  }
  
  const appEl = document.getElementById('app');
  const themeSelect = document.createElement('select');
  themeSelect.setAttribute('id', 'theme-select'); 
  
  Object.keys(themes).forEach((key) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    themeSelect.appendChild(option);
  });
  
  appEl?.appendChild(themeSelect);
  
  const todoWrapper = document.createElement('div');
  todoWrapper.setAttribute('id', 'my-list');
  appEl?.appendChild(todoWrapper);
  
  function updateTheme(themeKey: ThemeKey) {
    todoWrapper.innerHTML = "";
    const todo = new TodoComponent({
      theme: themes[themeKey],
    });
    todo.mount(todoWrapper);
  }
  
  themeSelect.value = DEFAULT_THEME;
  loadThemeStyles(DEFAULT_THEME).then(() => updateTheme(DEFAULT_THEME));
  
  themeSelect.addEventListener('change', async (e) => {
    const selectedTheme = (e.target as HTMLSelectElement).value as ThemeKey;
    await loadThemeStyles(selectedTheme);
    updateTheme(selectedTheme);
  });
  