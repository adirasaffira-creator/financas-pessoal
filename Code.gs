// ================================================================
// FINANÇAS PESSOAL — Construa Studio
// Google Apps Script (backend / banco de dados)
// ================================================================
// INSTRUÇÕES DE USO:
//  1. Abra https://script.google.com e crie um novo projeto
//  2. Cole TODO este código substituindo o que existir
//  3. Clique em "Implantar" → "Nova implantação"
//  4. Tipo: "App da Web"
//  5. Executar como: "Eu"
//  6. Quem tem acesso: "Qualquer pessoa"
//  7. Clique em Implantar e copie a URL gerada
//  8. Cole essa URL no app (Configurações → URL do Apps Script)
// ================================================================

const SHEET_NAME = 'financas_db';

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Cabeçalhos para facilitar leitura humana da planilha
    sheet.getRange('A1:B1').setValues([['chave', 'valor']]);
    sheet.getRange('A1:B1').setFontWeight('bold');
  }
  return sheet;
}

function getData(sheet, key) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      try { return JSON.parse(data[i][1]); }
      catch(e) { return data[i][1]; }
    }
  }
  return null;
}

function setData(sheet, key, value) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      sheet.getRange(i + 1, 2).setValue(JSON.stringify(value));
      return;
    }
  }
  // Se não existe, adiciona nova linha
  const lastRow = sheet.getLastRow() + 1;
  sheet.getRange(lastRow, 1, 1, 2).setValues([[key, JSON.stringify(value)]]);
}

// ── GET (carregar dados no app) ──────────────────────────────────
function doGet(e) {
  const action = e.parameter.action;
  const sheet = getOrCreateSheet();

  if (action === 'load') {
    const transactions = getData(sheet, 'transactions') || [];
    const config = getData(sheet, 'config') || { nu: 24050, br: 5000 };
    const adiantamentos = getData(sheet, 'adiantamentos') || {};

    return ContentService
      .createTextOutput(JSON.stringify({ transactions, config, adiantamentos }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ error: 'ação desconhecida' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── POST (salvar dados do app) ───────────────────────────────────
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    if (payload.action === 'save') {
      if (payload.transactions !== undefined) setData(sheet, 'transactions', payload.transactions);
      if (payload.config !== undefined) setData(sheet, 'config', payload.config);
      if (payload.adiantamentos !== undefined) setData(sheet, 'adiantamentos', payload.adiantamentos);

      return ContentService
        .createTextOutput(JSON.stringify({ ok: true, savedAt: new Date().toISOString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ error: 'ação desconhecida' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
