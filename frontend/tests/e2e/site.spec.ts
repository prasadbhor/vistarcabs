import { expect, test } from '@playwright/test';

test('homepage remains inside the viewport at desktop, tablet and phone widths', async ({ page }) => {
  for (const width of [1440, 1024, 768, 390, 360, 344]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /The road ahead/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Search Cabs/ })).toBeVisible();
    const metrics = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(metrics.content, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(metrics.viewport + 1);
  }
});

test('trip types reveal their relevant additional fields', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Round Trip' }).click();
  await expect(page.getByLabel('Return date')).toBeVisible();
  await page.getByRole('button', { name: 'Local Trip' }).click();
  await expect(page.getByLabel('Preferred duration')).toBeVisible();
  await expect(page.getByText('To location (optional)')).toBeVisible();
  await page.getByRole('button', { name: 'Airport Trip' }).click();
  await expect(page.getByLabel('Airport journey')).toBeVisible();
  await expect(page.getByPlaceholder('Airport or drop area')).toBeVisible();
  await page.getByRole('button', { name: 'One Way' }).click();
  await expect(page.getByLabel('Return date')).toHaveCount(0);
  await expect(page.getByLabel('Airport journey')).toHaveCount(0);
});

test('Maharashtra autocomplete can suggest Dhule', async ({ page }) => {
  await page.goto('/');
  const from = page.locator('input[name="from"]');
  await from.fill('Dhu');
  await expect(page.getByRole('option', { name: /Dhule/i }).first()).toBeVisible();
});

test('feedback preview slider is labelled as sample content and its controls move cards', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const feedback = page.locator('#feedback');
  await expect(feedback.getByText(/Design preview · sample text · not real reviews/i)).toBeVisible();
  const track = feedback.getByRole('region', { name: 'Sample feedback card layout' });
  const before = await track.evaluate((el) => el.scrollLeft);
  await feedback.getByRole('button', { name: 'Next feedback card' }).click();
  await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(before);
  await expect(feedback.getByText(/not customer statements/i)).toBeVisible();
});

test('valid enquiry builds a WhatsApp handoff without creating a real lead in this test', async ({ page }) => {
  await page.route('http://localhost:5000/api/inquiries', (route) => route.fulfill({
    status: 201,
    contentType: 'application/json',
    body: JSON.stringify({ ok: true, id: 'browser-test-only' }),
  }));
  await page.goto('/');
  await page.locator('input[name="from"]').fill('Nashik');
  await page.locator('input[name="to"]').fill('Pune');
  const date = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-CA');
  await page.locator('input[name="date"]').fill(date);
  await page.locator('input[name="time"]').fill('09:15');
  await page.locator('input[name="name"]').fill('Browser Test Passenger');
  await page.locator('input[name="phone"]').fill('9000000000');
  await page.getByRole('button', { name: /Search Cabs/ }).click();
  await expect(page.getByRole('status')).toContainText('Your enquiry is recorded');
  const handoff = page.getByRole('link', { name: /Continue on WhatsApp/ });
  await expect(handoff).toBeVisible();
  await expect(handoff).toHaveAttribute('href', /^https:\/\/wa\.me\//);
  expect(await handoff.getAttribute('href')).toContain(encodeURIComponent('Nashik'));
});
