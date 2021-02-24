defmodule RocketpayWeb.WelcomeController do
  use RocketpayWeb, :controller

  def index(conn, __params) do
    text(conn, "Welcome to the RocketPay API")
  end
end
