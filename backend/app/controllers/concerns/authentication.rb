module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :require_authentication
    helper_method :authenticated?
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  class_methods do
    def allow_unauthenticated_access(**options)
      skip_before_action :require_authentication, **options
    end
  end

  def authenticate_user!
    render json: { error: 'Not authenticated' }, status: :unauthorized unless current_user
  end

  private
    def authenticated?
      resume_session
    end

    def require_authentication 
      authenticate_user!
    end

    def resume_session
      Current.session ||= find_session_by_cookie
    end

    def find_session_by_cookie
      Session.find_by(id: cookies.signed[:session_id]) if cookies.signed[:session_id]
    end

    def request_authentication
      session[:return_to_after_authenticating] = request.url
      redirect_to new_session_path
    end

    def after_authentication_url
      '/users/me'
    end

    def start_new_session_for(user)
      user.sessions.create!(user_agent: request.user_agent, ip_address: request.remote_ip).tap do |session|
        Current.session = session
        cookies.signed.permanent[:session_id] = { value: session.id, httponly: true, same_site: :lax }
      end
    end

    def terminate_session
      if current_session
        current_session.destroy
        session.delete(:user_id) # Clear the session key
        session.delete(:session_id) # Clear other session keys if necessary
      else
        Rails.logger.warn 'No active session to destroy.'
      end
    end

    def current_session
      @current_session ||= Session.find_by(user_id: current_user.id) # Adjust for your session model
    end
end
