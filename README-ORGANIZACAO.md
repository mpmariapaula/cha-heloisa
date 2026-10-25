# Projeto Heloisa organizado

## Estrutura

```
src/
├── App.tsx                      # escolhe entre site público e área admin
├── PublicSite.tsx               # só imports + JSX das seções públicas
├── AdminApp.tsx                 # conecta os componentes, guarda os estados e escolhe a tela
├── admin/
│   ├── shared.tsx               # tipos, dados mockados, estilos (A), NAV_ITEMS e StatusBadge
│   ├── AdminLogin.tsx
│   ├── Sidebar.tsx
│   ├── Dashboard.tsx
│   ├── Guests.tsx
│   ├── DiapersAdmin.tsx
│   ├── GiftsAdmin.tsx
│   ├── MessagesAdmin.tsx
│   ├── GalleryAdmin.tsx
│   └── SettingsAdmin.tsx
├── PublicSiteSections/
│   ├── IntroSections.tsx        # decorações, Nav, Hero, Sobre, Evento
│   ├── GiftsSection.tsx         # presentes, fraldas e modais
│   ├── RSVPSection.tsx          # confirmação de presença
│   └── CommunitySections.tsx    # mensagens, galeria, compartilhar, rodapé, CTA flutuante
├── index.css
└── main.tsx
```

## AdminApp.tsx

Responsável apenas por:

1. controlar o login (`loggedIn`) e a tela ativa (`page`);
2. manter os estados compartilhados (convidados, mensagens, fraldas, presentes e configurações);
3. renderizar `Sidebar` e a tela correspondente, passando estado e setters por props.

Cada tela em `admin/` recebe o que precisa por props e não conhece as outras.

## Observação

A separação foi feita apenas movendo código, sem alterar o visual nem o fluxo.
Validado com `tsc --noEmit` (sem erros) e `vite build` (ok).
