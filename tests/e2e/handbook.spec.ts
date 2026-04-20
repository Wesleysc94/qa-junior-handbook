import { expect, test } from '@playwright/test';

const widths = [320, 390, 430, 768, 1280];

test('home smoke across key widths', async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'QA Junior Handbook' })).toBeVisible();
    await expect(page.getByTestId('continue-learning-card')).toBeVisible();
    await expect(page.getByTestId('review-today-card')).toBeVisible();
    await expect(page.getByTestId('missions-progress-card')).toBeVisible();
  }
});

test('persists chapter study actions and review hub', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs/01-fundamentos/o-que-e-qa');
  await page.getByTestId('bookmark-toggle').click();
  await page.getByTestId('review-later-toggle').click();
  await page.getByTestId('focus-mode-toggle').click();
  await page.locator('[data-quiz-id=\"o-que-e-qa-q1\"] button').first().click();
  await page.reload();
  await expect(page.getByTestId('bookmark-toggle')).toContainText('Salvo');
  await page.goto('/docs/revisao');
  await expect(page.getByText('Favoritos', { exact: true })).toBeVisible();
  await expect(page.getByText('Revisar depois', { exact: true })).toBeVisible();
  await expect(page.getByText('Quizzes para revisar', { exact: true })).toBeVisible();
});

test('guided mission works by tap only and updates review state', async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto('/docs/04-automacao-e2e/missao-fluxo-flaky');
  await expect(page.getByTestId('mission-progress')).toBeVisible();
  await expect(page.locator('input[type=\"text\"], textarea')).toHaveCount(0);

  for (const stepId of [
    'origem-mais-provavel',
    'melhor-ajuste-locator',
    'espera-mais-saudavel',
    'proximo-passo',
  ]) {
    await page.getByTestId(`mission-step-${stepId}`).getByRole('button').nth(1).click();
  }

  await expect(page.getByTestId('mission-summary')).toContainText(/Missão/);
  await page.goto('/');
  await expect(page.getByTestId('missions-progress-card')).toContainText('missão');
  await page.goto('/docs/revisao');
  await expect(page.getByText('Missões guiadas')).toBeVisible();
});
