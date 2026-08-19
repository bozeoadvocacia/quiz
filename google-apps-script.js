// ═══════════════════════════════════════════════════════════════
//  GOOGLE APPS SCRIPT — Quiz Bózeo Advocacia
//
//  INSTRUÇÕES DE INSTALAÇÃO:
//
//  1. Abra o Google Sheets e crie uma planilha nova chamada "Cadastros Quiz"
//  2. Na planilha, vá em: Extensões → Apps Script
//  3. Apague todo o código existente e cole este código inteiro
//  4. Clique em "Salvar" (ícone de disquete)
//  5. Clique em "Implantar" → "Nova implantação"
//  6. Em "Tipo", selecione "App da Web"
//  7. Em "Executar como", selecione "Eu" (sua conta Google)
//  8. Em "Quem pode acessar", selecione "Qualquer pessoa"
//  9. Clique em "Implantar" e autorize quando solicitado
//  10. COPIE a URL gerada (será algo como:
//      https://script.google.com/macros/s/AKfycb.../exec)
//  11. Cole essa URL no arquivo index.html na variável GOOGLE_SHEETS_URL
//
// ═══════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Criar cabeçalho se a planilha estiver vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data/Hora',
        'Nome',
        'Telefone',
        'E-mail',
        'Empresa',
        'Tem Advogado?',
        'Código do Jogo'
      ]);

      // Formatar cabeçalho
      var headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0d1b2a');
      headerRange.setFontColor('#c9a84c');
      sheet.setFrozenRows(1);

      // Ajustar largura das colunas
      sheet.setColumnWidth(1, 160); // Data
      sheet.setColumnWidth(2, 200); // Nome
      sheet.setColumnWidth(3, 150); // Telefone
      sheet.setColumnWidth(4, 250); // Email
      sheet.setColumnWidth(5, 200); // Empresa
      sheet.setColumnWidth(6, 120); // Advogado
      sheet.setColumnWidth(7, 120); // Código
    }

    // Adicionar linha com os dados
    sheet.appendRow([
      new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.company || '',
      data.hasLawyer || '',
      data.gameCode || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({status: 'ok'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Necessário para CORS — responde ao preflight
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'ok', message: 'Quiz Bózeo - API ativa'}))
    .setMimeType(ContentService.MimeType.JSON);
}
