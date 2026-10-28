const appState = {
  user: {
    nome: '',
    idade: null,
    acessoLiberado: false
  },
  cart: [],
  discountRate: 0,
  couponApplied: '',
  paymentMethod: 'pix'
};

const products = [
  { id: 1, name: "Vinho Alma Negra Cabernet", category: "vinho", price: 189.90, abv: "13.8%", image: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?auto=format&fit=crop&w=600&q=80", desc: "Encorpado, notas de frutas vermelhas e carvalho." },
  { id: 2, name: "Whisky Macallan 12 Anos", category: "whisky", price: 649.00, abv: "40.0%", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80", desc: "Single Malt escocês envelhecido em barris de xerez." },
  { id: 3, name: "Gin Tanqueray London Dry", category: "gin", price: 139.90, abv: "47.3%", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80", desc: "Zimbro selecionado, perfeito para Gin Tônica." },
  { id: 4, name: "Cerveja Artesanal IPA Torres", category: "cerveja", price: 24.90, abv: "6.5%", image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80", desc: "Amargor equilibrado e aromas cítricos." },
  { id: 5, name: "Vinho Rosé Piscine", category: "vinho", price: 129.00, abv: "11.0%", image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&w=600&q=80", desc: "Refrescante, feito para ser consumido com gelo." },
  { id: 6, name: "Gin Hendrick's", category: "gin", price: 219.00, abv: "41.4%", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=600&q=80", desc: "Infusão de pepino e pétalas de rosa." },
  { id: 7, name: "Vinho Sem Álcool Natureo", category: "sem-alcool", price: 89.90, abv: "0.0%", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80", desc: "0.0% de álcool, mantendo o sabor original da uva." },
  { id: 8, name: "Gin Sem Álcool Ceder's", category: "sem-alcool", price: 119.00, abv: "0.0%", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", desc: "Botânicos suecos com 0% de teor alcoólico." }
];

function switchTab(tabName) {
  if (tabName === 'cardapio' && !appState.user.acessoLiberado) {
    alert('Acesso Bloqueado! Preencha seus dados na Aba 1 primeiro.');
    return;
  }

  const tabPortaria = document.getElementById('tabPortaria');
  const tabCardapio = document.getElementById('tabCardapio');
  const btnPortaria = document.getElementById('tabBtnPortaria');
  const btnCardapio = document.getElementById('tabBtnCardapio');

  if (tabName === 'portaria') {
    tabPortaria.classList.add('active');
    tabCardapio.classList.remove('active');
    btnPortaria.className = "flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-gold-600 to-gold-500 text-noir-950 shadow-md";
    btnCardapio.className = "flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 text-gray-400 hover:text-gold-300";
  } else {
    tabPortaria.classList.remove('active');
    tabCardapio.classList.add('active');
    btnCardapio.className = "flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-gold-600 to-gold-500 text-noir-950 shadow-md";
    btnPortaria.className = "flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 text-gray-400 hover:text-gold-300";

    const lockScreen = document.getElementById('cardapioLockScreen');
    const content = document.getElementById('cardapioContent');
    if (appState.user.acessoLiberado) {
      lockScreen.classList.add('hidden');
      content.classList.remove('hidden');
      document.getElementById('clientGreeting').innerText = `Seja Bem-vindo(a), ${appState.user.nome}!`;
      renderMenu('all');
    } else {
      lockScreen.classList.remove('hidden');
      content.classList.add('hidden');
    }
  }
}

// Lógica de Validação com Troca Instantânea de Aba
function processPythonValidation() {
  const nomeInput = document.getElementById('inputNome').value.trim();
  const idadeInput = document.getElementById('inputIdade').value;
  const badgeAcessoOk = document.getElementById('badgeAcessoOk');

  if (!nomeInput) {
    alert("Erro: você precisa informar seu nome.");
    return;
  }

  if (idadeInput === "" || isNaN(idadeInput)) {
    alert("Erro: digite sua idade usando apenas números.");
    return;
  }

  const idade = parseInt(idadeInput, 10);

  if (idade < 0) {
    alert("Idade inválida. Digite uma idade positiva.");
    return;
  }

  if (idade >= 18) {
    appState.user = { nome: nomeInput, idade: idade, acessoLiberado: true };
    badgeAcessoOk.classList.remove('hidden');

    // Troca Imediata para a Aba de Cardápio ao Clicar
    switchTab('cardapio');
  } else {
    appState.user.acessoLiberado = false;
    badgeAcessoOk.classList.add('hidden');
    alert('Acesso negado: Este site é destinado a maiores de 18 anos.');
  }
}

function resetForm() {
  document.getElementById('accessForm').reset();
  document.getElementById('badgeAcessoOk').classList.add('hidden');
  appState.user.acessoLiberado = false;
}

function renderMenu(category = 'all') {
  const grid = document.getElementById('menuGrid');
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  grid.innerHTML = filtered.map(item => `
    <div class="glass-panel rounded-2xl overflow-hidden border border-gold-700/20 flex flex-col justify-between hover:border-gold-500/50 transition duration-300">
      <div>
        <div class="h-44 overflow-hidden relative bg-noir-900">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transform hover:scale-110 transition duration-500">
          <span class="absolute top-3 right-3 bg-noir-950/90 backdrop-blur-md text-gold-400 text-xs font-mono font-bold px-2.5 py-1 rounded-full border border-gold-500/30 shadow-md">
            R$ ${item.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div class="p-4 space-y-1.5">
          <span class="text-[10px] text-gold-500 uppercase tracking-widest font-semibold">${item.category} • Teor: ${item.abv}</span>
          <h3 class="font-serif text-base font-bold text-white">${item.name}</h3>
          <p class="text-gray-400 text-xs leading-relaxed line-clamp-2">${item.desc}</p>
        </div>
      </div>
      <div class="p-4 pt-0">
        <button onclick="addToCart(${item.id})" class="w-full bg-noir-900 border border-gold-600/40 hover:bg-gold-500 hover:text-noir-950 text-gold-400 font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-xs">
          <i class="fa-solid fa-plus"></i> Adicionar
        </button>
      </div>
    </div>
  `).join('');
}

function switchCategory(cat) {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.className = "cat-btn text-xs px-3.5 py-2 rounded-full bg-noir-900 border border-gray-700 hover:border-gold-500 text-gray-300 transition";
  });
  event.target.className = "cat-btn active text-xs px-3.5 py-2 rounded-full bg-gold-500 text-noir-950 font-semibold transition";
  renderMenu(cat);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = appState.cart.find(i => i.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    appState.cart.push({ ...product, qty: 1 });
  }

  updateCartCalculations();
  toggleCartDrawer(true);
}

function changeQtd(id, delta) {
  const item = appState.cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    appState.cart = appState.cart.filter(i => i.id !== id);
  }
  updateCartCalculations();
}

function applyCoupon() {
  const input = document.getElementById('couponInput').value.trim().toUpperCase();
  const msg = document.getElementById('couponMsg');

  if (input === 'TORRES10') {
    appState.discountRate = 0.10;
    appState.couponApplied = 'TORRES10';
    msg.innerText = '✓ Cupom TORRES10 aplicado (10% OFF)!';
    msg.className = 'text-[11px] text-emerald-400 font-medium block';
  } else {
    appState.discountRate = 0;
    appState.couponApplied = '';
    msg.innerText = '✕ Cupom inválido. Use TORRES10';
    msg.className = 'text-[11px] text-rose-400 font-medium block';
  }
  updateCartCalculations();
}

function updateCartCalculations() {
  const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalCount = appState.cart.reduce((sum, item) => sum + item.qty, 0);
  const discountVal = subtotal * appState.discountRate;
  const totalFinal = Math.max(0, subtotal - discountVal);

  document.getElementById('headerCartCount').innerText = totalCount;
  document.getElementById('headerCartTotal').innerText = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;
  document.getElementById('cartSubtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('cartTotal').innerText = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;

  const rowDesconto = document.getElementById('rowDesconto');
  if (discountVal > 0) {
    rowDesconto.classList.remove('hidden');
    document.getElementById('cartDesconto').innerText = `-R$ ${discountVal.toFixed(2).replace('.', ',')}`;
  } else {
    rowDesconto.classList.add('hidden');
  }

  const cartList = document.getElementById('cartItemsList');
  if (appState.cart.length === 0) {
    cartList.innerHTML = `<p class="text-gray-500 text-sm text-center py-8">Seu carrinho está vazio.</p>`;
    document.getElementById('btnProceedCheckout').disabled = true;
    document.getElementById('btnProceedCheckout').classList.add('opacity-50');
  } else {
    document.getElementById('btnProceedCheckout').disabled = false;
    document.getElementById('btnProceedCheckout').classList.remove('opacity-50');

    cartList.innerHTML = appState.cart.map(item => `
      <div class="flex items-center justify-between bg-noir-950 p-3 rounded-xl border border-gray-800">
        <div class="space-y-0.5">
          <h4 class="text-xs font-semibold text-white">${item.name}</h4>
          <p class="text-[11px] text-gold-400 font-mono">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="changeQtd(${item.id}, -1)" class="w-6 h-6 rounded bg-noir-900 border border-gray-700 text-gray-300 hover:border-gold-500 text-xs font-bold">-</button>
          <span class="text-xs font-mono w-4 text-center text-white">${item.qty}</span>
          <button onclick="changeQtd(${item.id}, 1)" class="w-6 h-6 rounded bg-noir-900 border border-gray-700 text-gray-300 hover:border-gold-500 text-xs font-bold">+</button>
        </div>
      </div>
    `).join('');
  }
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  if (open) {
    drawer.classList.remove('hidden');
  } else {
    drawer.classList.add('hidden');
  }
}

function openCheckoutModal() {
  if (appState.cart.length === 0) return;

  const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalFinal = Math.max(0, subtotal - (subtotal * appState.discountRate));

  document.getElementById('checkoutTotalVal').innerText = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;
  document.getElementById('checkoutClientName').innerText = appState.user.nome || "Cliente Torres Adega";

  toggleCartDrawer(false);
  document.getElementById('checkoutModal').classList.remove('hidden');
  selectPaymentMethod('pix');
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').classList.add('hidden');
}

function selectPaymentMethod(method) {
  appState.paymentMethod = method;

  document.querySelectorAll('.pay-method-btn').forEach(btn => {
    btn.classList.remove('active', 'border-gold-500', 'text-gold-400');
    btn.classList.add('border-gray-800', 'text-gray-400');
  });

  document.getElementById('detailsPix').classList.add('hidden');
  document.getElementById('detailsCredito').classList.add('hidden');
  document.getElementById('detailsDebito').classList.add('hidden');
  document.getElementById('detailsDinheiro').classList.add('hidden');

  if (method === 'pix') {
    document.getElementById('payBtnPix').classList.add('active', 'border-gold-500', 'text-gold-400');
    document.getElementById('detailsPix').classList.remove('hidden');
  } else if (method === 'credito') {
    document.getElementById('payBtnCredito').classList.add('active', 'border-gold-500', 'text-gold-400');
    document.getElementById('detailsCredito').classList.remove('hidden');
  } else if (method === 'debito') {
    document.getElementById('payBtnDebito').classList.add('active', 'border-gold-500', 'text-gold-400');
    document.getElementById('detailsDebito').classList.remove('hidden');
  } else if (method === 'dinheiro') {
    document.getElementById('payBtnDinheiro').classList.add('active', 'border-gold-500', 'text-gold-400');
    document.getElementById('detailsDinheiro').classList.remove('hidden');
    calculateTroco();
  }
}

function calculateTroco() {
  const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalFinal = Math.max(0, subtotal - (subtotal * appState.discountRate));
  const valEntregue = parseFloat(document.getElementById('inputTroco').value) || 0;
  const troco = Math.max(0, valEntregue - totalFinal);
  document.getElementById('trocoCalculado').innerText = `R$ ${troco.toFixed(2).replace('.', ',')}`;
}

function processPayment() {
  const btn = document.getElementById('btnSubmitPayment');
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processando...`;
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `<i class="fa-solid fa-lock"></i> Confirmar Pagamento`;
    btn.disabled = false;
    closeCheckoutModal();
    generateReceipt();
  }, 1500);
}

function generateReceipt() {
  const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountVal = subtotal * appState.discountRate;
  const totalFinal = Math.max(0, subtotal - discountVal);

  const randomOrder = Math.floor(1000 + Math.random() * 9000);
  const today = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});

  document.getElementById('receiptOrderNum').innerText = `#${randomOrder}`;
  document.getElementById('receiptDate').innerText = `Data: ${today}`;
  document.getElementById('receiptClient').innerText = appState.user.nome || "Cliente Torres Adega";
  document.getElementById('receiptPaymentMethod').innerText = appState.paymentMethod;

  document.getElementById('receiptItems').innerHTML = appState.cart.map(i => `
    <div class="flex justify-between">
      <span>${i.qty}x ${i.name}</span>
      <span>R$ ${(i.price * i.qty).toFixed(2).replace('.', ',')}</span>
    </div>
  `).join('');

  document.getElementById('receiptSubtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('receiptTotal').innerText = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;

  const discRow = document.getElementById('receiptDiscountRow');
  if (discountVal > 0) {
    discRow.classList.remove('hidden');
    document.getElementById('receiptDiscount').innerText = `-R$ ${discountVal.toFixed(2).replace('.', ',')}`;
  } else {
    discRow.classList.add('hidden');
  }

  document.getElementById('receiptModal').classList.remove('hidden');
}

function addNewOrderKeepSession() {
  document.getElementById('receiptModal').classList.add('hidden');
  appState.cart = [];
  appState.discountRate = 0;
  appState.couponApplied = '';
  document.getElementById('couponInput').value = '';
  document.getElementById('couponMsg').classList.add('hidden');
  updateCartCalculations();
  switchTab('cardapio');
}

function finishOrderAndReset() {
  document.getElementById('receiptModal').classList.add('hidden');
  appState.cart = [];
  appState.discountRate = 0;
  appState.couponApplied = '';
  document.getElementById('couponInput').value = '';
  document.getElementById('couponMsg').classList.add('hidden');
  updateCartCalculations();
  switchTab('portaria');
}