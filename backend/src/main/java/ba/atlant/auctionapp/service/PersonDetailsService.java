package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.model.PersonDetails;
import ba.atlant.auctionapp.repository.PersonRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PersonDetailsService implements UserDetailsService {
    final PersonRepository personRepository;

    public PersonDetailsService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Person person = personRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("No user found with provided email."));
        return PersonDetails.build(person);
    }
}