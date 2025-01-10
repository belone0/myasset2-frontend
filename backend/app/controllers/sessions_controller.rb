class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: "Try again later." }

  def new
  end

  def create
    user = User.find_by(email_address: params[:email_address])

    if user&.authenticate(params[:password])
      session[:user_id] = user.id 

      @session = Session.create(
        user: user,
        ip_address: request.remote_ip,
        user_agent: request.user_agent
      )

      render json: user, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
  
  def destroy
    terminate_session
  end
end
