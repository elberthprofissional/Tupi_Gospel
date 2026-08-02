# Site Tupi Gospel

Projeto responsivo completo para celular, tablet e computador.

## Como é o site

- **`index.html`** — cartão de visita digital com a marca, nota do Google, botões de ação (WhatsApp, catálogo, Google, Maps), telefones, endereço, horário de funcionamento e copyright.
- **`catalogo.html`** — catálogo completo (separado), com seções de artigos religiosos (bíblias, apoio igreja, unção, multimídia), locação de mesas e cadeiras, entregas, história, palavra do dia e contato. Aberto ao clicar em "Ver catálogo completo" no cartão. Inclui link "Voltar ao cartão".

## Arquivos

- `index.html` — cartão de visita + ficha do Google (JSON-LD)
- `catalogo.html` — catálogo completo (página separada)
- `css/style.css` — estilos do catálogo
- `js/main.js` — interatividade do catálogo (animações, carrossel, status da loja, Bíblia interativa)
- `img/` — fotos reais do catálogo
- `assets/mesa-tupi-gospel.png` — foto usada no topo do cartão
- `styles.css` — visual do cartão (index.html)
- `script.js` — atualiza o ano do copyright
- `favicon.svg` — ícone do site

## Como abrir

Dê dois cliques em `index.html`.

Para publicar, envie a pasta inteira para a Vercel, Netlify ou outro serviço de hospedagem.

## Telefones configurados

- (31) 98523-9497
- (31) 98281-9913

## Endereço configurado

R. Joaquim Cardoso, 368 - Tupi, Belo Horizonte - MG

## Horário de funcionamento

Todos os dias, das 08:00 às 19:00. (Aparece no rodapé do cartão e na ficha do Google.)

## Depois de publicar (importante)

Após publicar o site, abra o `index.html` e:

1. **Troque os URLs do site** (aparecem 4 vezes: 3 no Open Graph e 1 no JSON-LD): troque `https://tupigospel.vercel.app/` pela URL real da hospedagem. Ex.: se publicou como `https://minhaempresa.vercel.app`, os links viram `https://minhaempresa.vercel.app/assets/mesa-tupi-gospel.png`.
2. **Ajuste o `reviewCount`** no JSON-LD (ficha do Google) para o número real de avaliações que a Tupi Gospel tem no Google — usar um número errado pode prejudicar a ficha.
3. **Confira o preview do WhatsApp**: envie o link do site para você mesmo no WhatsApp e veja se aparece a imagem da mesa com o título. Se não aparecer, use o [debugger do Facebook](https://developers.facebook.com/tools/debug/) para atualizar o cache.

## QR Code

Depois de publicar o site, crie o QR Code usando a URL gerada pela hospedagem (o link deve apontar para `index.html`).
