package ba.atlant.auctionapp.config;

import ba.atlant.auctionapp.config.jwt.JwtEntryPoint;
import ba.atlant.auctionapp.config.jwt.JwtTokenFilter;
import ba.atlant.auctionapp.service.PersonDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.*;
import static ba.atlant.auctionapp.enumeration.Role.*;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {
    AuthenticationManager authenticationManager;
    private final PersonDetailsService personDetailsService;
    private final JwtEntryPoint authEntryPointJwt;

    public WebSecurityConfiguration(PersonDetailsService personDetailsService, JwtEntryPoint authEntryPointJwt) {
        this.personDetailsService = personDetailsService;
        this.authEntryPointJwt = authEntryPointJwt;
    }

    @Bean
    public JwtTokenFilter authenticationJwtTokenFilter() {
        return new JwtTokenFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(personDetailsService).passwordEncoder(passwordEncoder());
        authenticationManager = authenticationManagerBuilder.build();
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(authEntryPointJwt).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeHttpRequests()
                .requestMatchers(GET,"/api/product").permitAll()
                .requestMatchers(GET,"/api/product/highlight").permitAll()
                .requestMatchers(GET,"/api/product/all/new-arrivals").permitAll()
                .requestMatchers(GET,"/api/product/all/last-chance").permitAll()
                .requestMatchers(GET,"/api/product/all/category").permitAll()
                .requestMatchers(GET,"/api/product/all/sub-category").permitAll()
                .requestMatchers(GET,"/api/product/all/search-suggestion").permitAll()
                .requestMatchers(GET,"/api/product/all/search-products").permitAll()
                .requestMatchers(POST,"/api/product").hasAuthority(ROLE_USER.name())
                .requestMatchers(GET,"/api/sub-category/all/category").permitAll()
                .requestMatchers(GET,"/api/category").permitAll()
                .requestMatchers(GET,"/api/category/subcategories").permitAll()
                .requestMatchers(GET,"/api/category/search").permitAll()
                .requestMatchers(POST, "/api/user/login").permitAll()
                .requestMatchers(POST, "/api/user/register").permitAll()
                .requestMatchers(GET, "/api/user").hasAuthority(ROLE_USER.name())
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**", "/v2/api-docs/**").permitAll()
                .requestMatchers("/**").denyAll()
                .anyRequest().permitAll().and().authenticationManager(authenticationManager);
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials");
            }
        };
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}