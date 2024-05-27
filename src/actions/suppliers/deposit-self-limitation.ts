export async function depositSelfLimitation() {
  const sepositSelfLimitationUrl = process.env.SELF_LIMITATION_URL ?? "";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    dailyAmount: 55,
    weeklyAmount: 14,
    monthlyAmount: 21,
    minimumAmount: 1,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body,
  };
  try {
    await fetch(sepositSelfLimitationUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result));
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error,
    };
  }
}
