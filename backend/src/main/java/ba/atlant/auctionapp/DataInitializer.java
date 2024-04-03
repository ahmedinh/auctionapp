package ba.atlant.auctionapp;

import ba.atlant.auctionapp.enumeration.Color;
import ba.atlant.auctionapp.enumeration.Size;
import ba.atlant.auctionapp.model.*;
import ba.atlant.auctionapp.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final RoleRepository roleRepository;
    private final ProductPictureRepository productPictureRepository;
    private final BidRepository bidRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void run(String... args) {
        if (productRepository.findAll().isEmpty() &&
            userRepository.findAll().isEmpty() &&
            roleRepository.findAll().isEmpty() &&
            productPictureRepository.findAll().isEmpty() &&
            bidRepository.findAll().isEmpty() &&
            categoryRepository.findAll().isEmpty() &&
            subCategoryRepository.findAll().isEmpty()) {
            alterTable();
            fill();
        }
    }

    private void alterTable() {
        entityManager.createNativeQuery("ALTER TABLE product_picture ALTER COLUMN url TYPE VARCHAR(2000)").executeUpdate();
        entityManager.createNativeQuery("ALTER TABLE product ALTER COLUMN description TYPE VARCHAR(2000);").executeUpdate();
    }

    private void fill() {
        Role role = new Role();
        role.setName("USER");

        User user = new User();
        user.setRole(role);
        user.setFirstName("Ahmedin");
        user.setLastName("Hasanovic");
        user.setCountry("Bosna i Hercegovina");
        user.setEmail("ahmedinhasanovic2000@gmail.com");
        user.setPassword("DummyPassword123");
        user.setUsername("username1");
        user.setBirthDate(LocalDate.from(LocalDateTime.of(2000,2,21,14,30)));

        Category women = new Category("Women");
        Category men = new Category("Men");
        Category kids = new Category("Kids");
        Category accessories = new Category("Accessories");
        Category home = new Category("Home");
        Category art = new Category("Art");
        Category computers = new Category("Computers");

        SubCategory womenAccessories = new SubCategory("Accessories", women);
        SubCategory bags = new SubCategory("Bags", women);
        SubCategory womenShoes = new SubCategory("Shoes", women);

        SubCategory menAccessories = new SubCategory("Accessories", men);
        SubCategory shoes = new SubCategory("Shoes", men);
        SubCategory menClothes = new SubCategory("Clothes", men);

        SubCategory toys = new SubCategory("Toys", kids);
        SubCategory kidsClothes = new SubCategory("Clothes", kids);

        SubCategory watches = new SubCategory("Watches", accessories);
        SubCategory jewelry = new SubCategory("Jewelry", accessories);

        SubCategory bedBath = new SubCategory("Bed & Bath", home);
        SubCategory kitchenware = new SubCategory("Kitchenware", home);

        SubCategory paintings = new SubCategory("Paintings", art);
        SubCategory sculptures = new SubCategory("Sculptures", art);

        SubCategory laptops = new SubCategory("Laptops", computers);
        SubCategory peripherals = new SubCategory("Peripherals", computers);

        Product product = new Product("Shoes Collection", "This is a description for shoes collection.", BigDecimal.valueOf(55), LocalDateTime.now(), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(15), Size.LARGE, Color.BLACK, womenShoes, user);
        Product product2 = new Product("Shoes Collection", "This is a description for shoes collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(5), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(15), Size.LARGE, Color.BLACK, womenShoes, user);
        Product product3 = new Product("Shoes Collection", "This is a description for shoes collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(3), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(14), Size.LARGE, Color.BLACK, womenShoes, user);
        Product product4 = new Product("Shoes Collection", "This is a description for shoes collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(8), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(13), Size.LARGE, Color.BLACK, womenShoes, user);
        Product product5 = new Product("Shoes Collection", "This is a description for shoes collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(1), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(17), Size.LARGE, Color.BLACK, womenShoes, user);
        Product product6 = new Product("Shoes Collection", "This is a description for shoes collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(4), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(55), Size.LARGE, Color.BLACK, womenShoes, user);
        Product product7 = new Product("Shoes Collection", "This is a description for shoes collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(11), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(43), Size.LARGE, Color.BLACK, womenShoes, user);
        Product product8 = new Product("Shoes Collection", "This is a description for shoes collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(130), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(27), Size.LARGE, Color.BLACK, womenShoes, user);
        Product product9 = new Product("Shoes Collection", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(25), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(33), Size.LARGE, Color.BLACK, womenShoes, user);
        Product product10 = new Product("Shoes Collection", "This is a description for shoes collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(17), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(12), Size.LARGE, Color.BLACK, womenShoes, user);

        Product product11 = new Product("Accessories Collection", "This is a description for accessories collection.", BigDecimal.valueOf(55), LocalDateTime.now(), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(15), Size.LARGE, Color.BLACK, womenAccessories, user);
        Product product12 = new Product("Accessories Collection", "This is a description for accessories collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(5), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(15), Size.LARGE, Color.BLACK, womenAccessories, user);
        Product product13 = new Product("Accessories Collection", "This is a description for accessories collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(3), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(14), Size.LARGE, Color.BLACK, womenAccessories, user);
        Product product14 = new Product("Accessories Collection", "This is a description for accessories collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(8), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(13), Size.LARGE, Color.BLACK, womenAccessories, user);
        Product product15 = new Product("Accessories Collection", "This is a description for accessories collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(1), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(17), Size.LARGE, Color.BLACK, womenAccessories, user);
        Product product16 = new Product("Accessories Collection", "This is a description for accessories collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(4), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(55), Size.LARGE, Color.BLACK, womenAccessories, user);
        Product product17 = new Product("Accessories Collection", "This is a description for accessories collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(11), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(43), Size.LARGE, Color.BLACK, womenAccessories, user);
        Product product18 = new Product("Accessories Collection", "This is a description for accessories collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(130), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(27), Size.LARGE, Color.BLACK, womenAccessories, user);
        Product product19 = new Product("Accessories Collection", "This is a description for accessories collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(25), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(33), Size.LARGE, Color.BLACK, womenAccessories, user);
        Product product20 = new Product("Accessories Collection", "This is a description for accessories collection.", BigDecimal.valueOf(56), LocalDateTime.now().plusMinutes(17), LocalDateTime.now().plusHours(10), LocalDateTime.now().plusDays(12), Size.LARGE, Color.BLACK, womenAccessories, user);

        ProductPicture productPicture1 = new ProductPicture("Picture 1", "https://s3-alpha-sig.figma.com/img/372d/fb3b/d1fb068a42f25f33e4d035b8cd46dc87?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pAYN9OhINImRVPcXMJib6cF9au5n-G07TKocVCSMFKZvJRs7tCIP5fWIwiWiixTeM-yIe8jEjdmqkUVxDS5SS9M5Yy8G2F4usva5f0D1RmI8V5VMk0TZOSAGqSBiB2m9miC2JBakDtteAkFhP847k1wXHpEzDNwptiRerPLVjOxQJM3Xon5rH~LZTQkOxxRZhkn3xNv7vpCCA49U~Oxtu7mJsMwkX1CXbGaaMDIMOwKXHoRZLVnj~AkOMRQsGDqY~Oz2anoCvS5OA4o0EvkirThWtYbL9qRNChSC-DQwq2DwtvGbMTmZg3Apwc7Fq1AFlxIhN2OrsKVh7nu~WouplQ__", product);
        ProductPicture productPicture2 = new ProductPicture("Picture 2", "https://s3-alpha-sig.figma.com/img/372d/fb3b/d1fb068a42f25f33e4d035b8cd46dc87?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pAYN9OhINImRVPcXMJib6cF9au5n-G07TKocVCSMFKZvJRs7tCIP5fWIwiWiixTeM-yIe8jEjdmqkUVxDS5SS9M5Yy8G2F4usva5f0D1RmI8V5VMk0TZOSAGqSBiB2m9miC2JBakDtteAkFhP847k1wXHpEzDNwptiRerPLVjOxQJM3Xon5rH~LZTQkOxxRZhkn3xNv7vpCCA49U~Oxtu7mJsMwkX1CXbGaaMDIMOwKXHoRZLVnj~AkOMRQsGDqY~Oz2anoCvS5OA4o0EvkirThWtYbL9qRNChSC-DQwq2DwtvGbMTmZg3Apwc7Fq1AFlxIhN2OrsKVh7nu~WouplQ__", product2);
        ProductPicture productPicture3 = new ProductPicture("Picture 3", "https://s3-alpha-sig.figma.com/img/e390/335e/ee1daacadb7b29866beceafd04f5c1ef?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBEdMpxkzOthzmLfAdPRinzI~exOfomgEi1DS59MWetaCW2Pv9o1VAw7zJk4RF2EMP-FUoMOeI3O8RSNN1meKCd4-zgTaCZ0YayNETzGEGUU3LOnxrMyTxCDsHQksGHNfE3eS2ZUMQyb66VTy656bqcKOj651GhR9QCy-9zhLtB7RTPRTmKBO4GnRIgD5LBjYrAQq24KMO48o0Uzzhljs-TEt2M4UFVlaZFNi0B443u0EllQPjX~FJx5Y3MwTUEXfGwLRaBy62xzWBD-wTH9z1vckmas3eejksChSJ4YFRuAWOhUYUF0iF7ItgyJcBmDdYJaU~ahTZ2ETbsFLwmkNg__", product3);
        ProductPicture productPicture4 = new ProductPicture("Picture 4", "https://s3-alpha-sig.figma.com/img/da55/2f91/5355f66980c4f2cb9287a5d7fa33ea1f?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gUX2OcDoIW19i7KblFAknVPLtzXTlMT7yPloOoFy67vKh4qBoUDVGitFc4kWA5j-kCPItSTtktE1CHtYgnMwx6Ti8nbr6VWXQ961oskZMq-gzTHGnd3mCpgMXPPNfwtJH~YxXJLOjPJMnOdtzLcPFfiTHj5NqNJZM5nW2Fvx~DGP1q0HU~aLQiK64-R5cjOGyHSzYa3ShZJBI9VlK3by-Qvaejj3BaOJnYRIYc9NF64960ogadr7zMAymYJW6Jzt5u4evAf089JelByAxb7SF6fJ03glN~KQlvKFXt4Cp6DImq4NgbpYml-Juw6kOGTRcGoMWYQw4fvwUsSA8WjJxA__", product4);
        ProductPicture productPicture5 = new ProductPicture("Picture 5", "https://s3-alpha-sig.figma.com/img/03f6/9682/0c7c5dcec2c556120281b996e91e9180?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m4TcoHdrMIIGnbIYhyBCN5Zhpz~aJfLij0lMf9IYnpUeK4INVP4ZnALckieYj7iFweEjzbuK5~8dCT7zhVaiNGu0XP~HDuWkHra-iDZI4VJRr4FDTVsXLwHh~1CU8GNNy6pBgVq16jyt2b~Swcwz8qQ3vNqRtGJYh1yP5MEjkDkxO0AER4BGZadxHLVPa2aq9BdWUL4xeJBPrWNB-D4Mvbuq86ueLltuCUB3n6~Pgli1Y6I4rXVfOlox2wOLRcnBVAVYklOPIEztNz1cjXdtkDAN7CM6d9hqRXzAzxcZZUHwpYYv-9zZpi52n7AID4tucDIS64fDuIXG0Yj1wjVmMg__", product5);
        ProductPicture productPicture6 = new ProductPicture("Picture 6", "https://s3-alpha-sig.figma.com/img/372d/fb3b/d1fb068a42f25f33e4d035b8cd46dc87?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pAYN9OhINImRVPcXMJib6cF9au5n-G07TKocVCSMFKZvJRs7tCIP5fWIwiWiixTeM-yIe8jEjdmqkUVxDS5SS9M5Yy8G2F4usva5f0D1RmI8V5VMk0TZOSAGqSBiB2m9miC2JBakDtteAkFhP847k1wXHpEzDNwptiRerPLVjOxQJM3Xon5rH~LZTQkOxxRZhkn3xNv7vpCCA49U~Oxtu7mJsMwkX1CXbGaaMDIMOwKXHoRZLVnj~AkOMRQsGDqY~Oz2anoCvS5OA4o0EvkirThWtYbL9qRNChSC-DQwq2DwtvGbMTmZg3Apwc7Fq1AFlxIhN2OrsKVh7nu~WouplQ__", product6);
        ProductPicture productPicture7 = new ProductPicture("Picture 7", "https://s3-alpha-sig.figma.com/img/5cb0/e618/c428c4fea76179648f8c2e3e41b721b4?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cCFg-9XdA4CgBkxXmYgO7T1zpaqfEbpR8vprEVlIz4OV1Utlc65g6TPaBPOjacbMkDPed5~F7MSfJzdrf16~9w9flIbz7xJULhuub6h3zelZ8jx6dwgUEaAMj5DlfkSRrrIl5PYE9xLLJ4HALfWKm2BE0layAJCN06oyf6lWXuBmPLdJ3CQ4JWY9EI6wcJrc5TwQJmCXIWSqogm4tQd4Bn7rhm~YQQY1~s6jtO7yp6Zfg~P~nMf2AW1jZ51x5l1NE68rJHavSxWQGgdJEGRbGTEr2uCASrSnW14KE2R~1jsvyA~iRhTTzQC607VO-AQw8rklgGHqxy-Ewz8a9zqGNg__", product7);
        ProductPicture productPicture8 = new ProductPicture("Picture 8", "https://s3-alpha-sig.figma.com/img/7213/858a/f55e6c4ddd1c96a1807e86f07e25aa43?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YKCdRkXUWnkDH4jKMbxQHb7I2cpyGjkucPCRxwmwubLbwP3YgvfVjXRN451D5vo7WEhQxVSqNMnNftyAV9O7-x75nfdvhBuxzoNIl~SaWoxK4FeE6EZwgl~78Ialz-bEUdkf9S22h2N4ic-LFiB0ZNnhSZJ3MlW7vi63XcPOUw6NkV2vqXWsEXQR4NxAqc5TGlmbJhg2BTK2zBXG0XJuVN5UQCrS9DmP6Cn7U3nuWtxv775FnIYbXUu9Hwpmw-6z2xbermiVofoiC~t2V5wIHCPn76iZ3r8nMCO4jSGBWcXK-L1Jvx9i2Wqggs9nKBNoVV1LwUBPqilhTbJd1Uz~kg__", product8);
        ProductPicture productPicture9 = new ProductPicture("Picture 9", "https://s3-alpha-sig.figma.com/img/372d/fb3b/d1fb068a42f25f33e4d035b8cd46dc87?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pAYN9OhINImRVPcXMJib6cF9au5n-G07TKocVCSMFKZvJRs7tCIP5fWIwiWiixTeM-yIe8jEjdmqkUVxDS5SS9M5Yy8G2F4usva5f0D1RmI8V5VMk0TZOSAGqSBiB2m9miC2JBakDtteAkFhP847k1wXHpEzDNwptiRerPLVjOxQJM3Xon5rH~LZTQkOxxRZhkn3xNv7vpCCA49U~Oxtu7mJsMwkX1CXbGaaMDIMOwKXHoRZLVnj~AkOMRQsGDqY~Oz2anoCvS5OA4o0EvkirThWtYbL9qRNChSC-DQwq2DwtvGbMTmZg3Apwc7Fq1AFlxIhN2OrsKVh7nu~WouplQ__", product9);
        ProductPicture productPicture10 = new ProductPicture("Picture 10", "https://s3-alpha-sig.figma.com/img/372d/fb3b/d1fb068a42f25f33e4d035b8cd46dc87?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pAYN9OhINImRVPcXMJib6cF9au5n-G07TKocVCSMFKZvJRs7tCIP5fWIwiWiixTeM-yIe8jEjdmqkUVxDS5SS9M5Yy8G2F4usva5f0D1RmI8V5VMk0TZOSAGqSBiB2m9miC2JBakDtteAkFhP847k1wXHpEzDNwptiRerPLVjOxQJM3Xon5rH~LZTQkOxxRZhkn3xNv7vpCCA49U~Oxtu7mJsMwkX1CXbGaaMDIMOwKXHoRZLVnj~AkOMRQsGDqY~Oz2anoCvS5OA4o0EvkirThWtYbL9qRNChSC-DQwq2DwtvGbMTmZg3Apwc7Fq1AFlxIhN2OrsKVh7nu~WouplQ__", product10);
        ProductPicture productPicture11 = new ProductPicture("Picture 11", "https://s3-alpha-sig.figma.com/img/e390/335e/ee1daacadb7b29866beceafd04f5c1ef?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBEdMpxkzOthzmLfAdPRinzI~exOfomgEi1DS59MWetaCW2Pv9o1VAw7zJk4RF2EMP-FUoMOeI3O8RSNN1meKCd4-zgTaCZ0YayNETzGEGUU3LOnxrMyTxCDsHQksGHNfE3eS2ZUMQyb66VTy656bqcKOj651GhR9QCy-9zhLtB7RTPRTmKBO4GnRIgD5LBjYrAQq24KMO48o0Uzzhljs-TEt2M4UFVlaZFNi0B443u0EllQPjX~FJx5Y3MwTUEXfGwLRaBy62xzWBD-wTH9z1vckmas3eejksChSJ4YFRuAWOhUYUF0iF7ItgyJcBmDdYJaU~ahTZ2ETbsFLwmkNg__", product11);
        ProductPicture productPicture12 = new ProductPicture("Picture 12", "https://s3-alpha-sig.figma.com/img/da55/2f91/5355f66980c4f2cb9287a5d7fa33ea1f?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gUX2OcDoIW19i7KblFAknVPLtzXTlMT7yPloOoFy67vKh4qBoUDVGitFc4kWA5j-kCPItSTtktE1CHtYgnMwx6Ti8nbr6VWXQ961oskZMq-gzTHGnd3mCpgMXPPNfwtJH~YxXJLOjPJMnOdtzLcPFfiTHj5NqNJZM5nW2Fvx~DGP1q0HU~aLQiK64-R5cjOGyHSzYa3ShZJBI9VlK3by-Qvaejj3BaOJnYRIYc9NF64960ogadr7zMAymYJW6Jzt5u4evAf089JelByAxb7SF6fJ03glN~KQlvKFXt4Cp6DImq4NgbpYml-Juw6kOGTRcGoMWYQw4fvwUsSA8WjJxA__", product12);
        ProductPicture productPicture13 = new ProductPicture("Picture 13", "https://s3-alpha-sig.figma.com/img/03f6/9682/0c7c5dcec2c556120281b996e91e9180?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m4TcoHdrMIIGnbIYhyBCN5Zhpz~aJfLij0lMf9IYnpUeK4INVP4ZnALckieYj7iFweEjzbuK5~8dCT7zhVaiNGu0XP~HDuWkHra-iDZI4VJRr4FDTVsXLwHh~1CU8GNNy6pBgVq16jyt2b~Swcwz8qQ3vNqRtGJYh1yP5MEjkDkxO0AER4BGZadxHLVPa2aq9BdWUL4xeJBPrWNB-D4Mvbuq86ueLltuCUB3n6~Pgli1Y6I4rXVfOlox2wOLRcnBVAVYklOPIEztNz1cjXdtkDAN7CM6d9hqRXzAzxcZZUHwpYYv-9zZpi52n7AID4tucDIS64fDuIXG0Yj1wjVmMg__", product13);
        ProductPicture productPicture14 = new ProductPicture("Picture 14", "https://s3-alpha-sig.figma.com/img/372d/fb3b/d1fb068a42f25f33e4d035b8cd46dc87?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pAYN9OhINImRVPcXMJib6cF9au5n-G07TKocVCSMFKZvJRs7tCIP5fWIwiWiixTeM-yIe8jEjdmqkUVxDS5SS9M5Yy8G2F4usva5f0D1RmI8V5VMk0TZOSAGqSBiB2m9miC2JBakDtteAkFhP847k1wXHpEzDNwptiRerPLVjOxQJM3Xon5rH~LZTQkOxxRZhkn3xNv7vpCCA49U~Oxtu7mJsMwkX1CXbGaaMDIMOwKXHoRZLVnj~AkOMRQsGDqY~Oz2anoCvS5OA4o0EvkirThWtYbL9qRNChSC-DQwq2DwtvGbMTmZg3Apwc7Fq1AFlxIhN2OrsKVh7nu~WouplQ__", product14);
        ProductPicture productPicture15 = new ProductPicture("Picture 15", "https://s3-alpha-sig.figma.com/img/5cb0/e618/c428c4fea76179648f8c2e3e41b721b4?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cCFg-9XdA4CgBkxXmYgO7T1zpaqfEbpR8vprEVlIz4OV1Utlc65g6TPaBPOjacbMkDPed5~F7MSfJzdrf16~9w9flIbz7xJULhuub6h3zelZ8jx6dwgUEaAMj5DlfkSRrrIl5PYE9xLLJ4HALfWKm2BE0layAJCN06oyf6lWXuBmPLdJ3CQ4JWY9EI6wcJrc5TwQJmCXIWSqogm4tQd4Bn7rhm~YQQY1~s6jtO7yp6Zfg~P~nMf2AW1jZ51x5l1NE68rJHavSxWQGgdJEGRbGTEr2uCASrSnW14KE2R~1jsvyA~iRhTTzQC607VO-AQw8rklgGHqxy-Ewz8a9zqGNg__", product15);
        ProductPicture productPicture16 = new ProductPicture("Picture 16", "https://s3-alpha-sig.figma.com/img/7213/858a/f55e6c4ddd1c96a1807e86f07e25aa43?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YKCdRkXUWnkDH4jKMbxQHb7I2cpyGjkucPCRxwmwubLbwP3YgvfVjXRN451D5vo7WEhQxVSqNMnNftyAV9O7-x75nfdvhBuxzoNIl~SaWoxK4FeE6EZwgl~78Ialz-bEUdkf9S22h2N4ic-LFiB0ZNnhSZJ3MlW7vi63XcPOUw6NkV2vqXWsEXQR4NxAqc5TGlmbJhg2BTK2zBXG0XJuVN5UQCrS9DmP6Cn7U3nuWtxv775FnIYbXUu9Hwpmw-6z2xbermiVofoiC~t2V5wIHCPn76iZ3r8nMCO4jSGBWcXK-L1Jvx9i2Wqggs9nKBNoVV1LwUBPqilhTbJd1Uz~kg__", product16);
        ProductPicture productPicture17 = new ProductPicture("Picture 17", "https://s3-alpha-sig.figma.com/img/372d/fb3b/d1fb068a42f25f33e4d035b8cd46dc87?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pAYN9OhINImRVPcXMJib6cF9au5n-G07TKocVCSMFKZvJRs7tCIP5fWIwiWiixTeM-yIe8jEjdmqkUVxDS5SS9M5Yy8G2F4usva5f0D1RmI8V5VMk0TZOSAGqSBiB2m9miC2JBakDtteAkFhP847k1wXHpEzDNwptiRerPLVjOxQJM3Xon5rH~LZTQkOxxRZhkn3xNv7vpCCA49U~Oxtu7mJsMwkX1CXbGaaMDIMOwKXHoRZLVnj~AkOMRQsGDqY~Oz2anoCvS5OA4o0EvkirThWtYbL9qRNChSC-DQwq2DwtvGbMTmZg3Apwc7Fq1AFlxIhN2OrsKVh7nu~WouplQ__", product17);
        ProductPicture productPicture18 = new ProductPicture("Picture 18", "https://s3-alpha-sig.figma.com/img/372d/fb3b/d1fb068a42f25f33e4d035b8cd46dc87?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pAYN9OhINImRVPcXMJib6cF9au5n-G07TKocVCSMFKZvJRs7tCIP5fWIwiWiixTeM-yIe8jEjdmqkUVxDS5SS9M5Yy8G2F4usva5f0D1RmI8V5VMk0TZOSAGqSBiB2m9miC2JBakDtteAkFhP847k1wXHpEzDNwptiRerPLVjOxQJM3Xon5rH~LZTQkOxxRZhkn3xNv7vpCCA49U~Oxtu7mJsMwkX1CXbGaaMDIMOwKXHoRZLVnj~AkOMRQsGDqY~Oz2anoCvS5OA4o0EvkirThWtYbL9qRNChSC-DQwq2DwtvGbMTmZg3Apwc7Fq1AFlxIhN2OrsKVh7nu~WouplQ__", product18);
        ProductPicture productPicture19 = new ProductPicture("Picture 19", "https://s3-alpha-sig.figma.com/img/e390/335e/ee1daacadb7b29866beceafd04f5c1ef?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBEdMpxkzOthzmLfAdPRinzI~exOfomgEi1DS59MWetaCW2Pv9o1VAw7zJk4RF2EMP-FUoMOeI3O8RSNN1meKCd4-zgTaCZ0YayNETzGEGUU3LOnxrMyTxCDsHQksGHNfE3eS2ZUMQyb66VTy656bqcKOj651GhR9QCy-9zhLtB7RTPRTmKBO4GnRIgD5LBjYrAQq24KMO48o0Uzzhljs-TEt2M4UFVlaZFNi0B443u0EllQPjX~FJx5Y3MwTUEXfGwLRaBy62xzWBD-wTH9z1vckmas3eejksChSJ4YFRuAWOhUYUF0iF7ItgyJcBmDdYJaU~ahTZ2ETbsFLwmkNg__", product19);
        ProductPicture productPicture20 = new ProductPicture("Picture 20", "https://s3-alpha-sig.figma.com/img/da55/2f91/5355f66980c4f2cb9287a5d7fa33ea1f?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gUX2OcDoIW19i7KblFAknVPLtzXTlMT7yPloOoFy67vKh4qBoUDVGitFc4kWA5j-kCPItSTtktE1CHtYgnMwx6Ti8nbr6VWXQ961oskZMq-gzTHGnd3mCpgMXPPNfwtJH~YxXJLOjPJMnOdtzLcPFfiTHj5NqNJZM5nW2Fvx~DGP1q0HU~aLQiK64-R5cjOGyHSzYa3ShZJBI9VlK3by-Qvaejj3BaOJnYRIYc9NF64960ogadr7zMAymYJW6Jzt5u4evAf089JelByAxb7SF6fJ03glN~KQlvKFXt4Cp6DImq4NgbpYml-Juw6kOGTRcGoMWYQw4fvwUsSA8WjJxA__", product20);
        ProductPicture productPicture21 = new ProductPicture("Picture 21", "https://s3-alpha-sig.figma.com/img/03f6/9682/0c7c5dcec2c556120281b996e91e9180?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m4TcoHdrMIIGnbIYhyBCN5Zhpz~aJfLij0lMf9IYnpUeK4INVP4ZnALckieYj7iFweEjzbuK5~8dCT7zhVaiNGu0XP~HDuWkHra-iDZI4VJRr4FDTVsXLwHh~1CU8GNNy6pBgVq16jyt2b~Swcwz8qQ3vNqRtGJYh1yP5MEjkDkxO0AER4BGZadxHLVPa2aq9BdWUL4xeJBPrWNB-D4Mvbuq86ueLltuCUB3n6~Pgli1Y6I4rXVfOlox2wOLRcnBVAVYklOPIEztNz1cjXdtkDAN7CM6d9hqRXzAzxcZZUHwpYYv-9zZpi52n7AID4tucDIS64fDuIXG0Yj1wjVmMg__", product20);
        ProductPicture productPicture22 = new ProductPicture("Picture 22", "https://s3-alpha-sig.figma.com/img/372d/fb3b/d1fb068a42f25f33e4d035b8cd46dc87?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pAYN9OhINImRVPcXMJib6cF9au5n-G07TKocVCSMFKZvJRs7tCIP5fWIwiWiixTeM-yIe8jEjdmqkUVxDS5SS9M5Yy8G2F4usva5f0D1RmI8V5VMk0TZOSAGqSBiB2m9miC2JBakDtteAkFhP847k1wXHpEzDNwptiRerPLVjOxQJM3Xon5rH~LZTQkOxxRZhkn3xNv7vpCCA49U~Oxtu7mJsMwkX1CXbGaaMDIMOwKXHoRZLVnj~AkOMRQsGDqY~Oz2anoCvS5OA4o0EvkirThWtYbL9qRNChSC-DQwq2DwtvGbMTmZg3Apwc7Fq1AFlxIhN2OrsKVh7nu~WouplQ__", product20);
        ProductPicture productPicture23 = new ProductPicture("Picture 23", "https://s3-alpha-sig.figma.com/img/5cb0/e618/c428c4fea76179648f8c2e3e41b721b4?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cCFg-9XdA4CgBkxXmYgO7T1zpaqfEbpR8vprEVlIz4OV1Utlc65g6TPaBPOjacbMkDPed5~F7MSfJzdrf16~9w9flIbz7xJULhuub6h3zelZ8jx6dwgUEaAMj5DlfkSRrrIl5PYE9xLLJ4HALfWKm2BE0layAJCN06oyf6lWXuBmPLdJ3CQ4JWY9EI6wcJrc5TwQJmCXIWSqogm4tQd4Bn7rhm~YQQY1~s6jtO7yp6Zfg~P~nMf2AW1jZ51x5l1NE68rJHavSxWQGgdJEGRbGTEr2uCASrSnW14KE2R~1jsvyA~iRhTTzQC607VO-AQw8rklgGHqxy-Ewz8a9zqGNg__", product20);
        ProductPicture productPicture24 = new ProductPicture("Picture 24", "https://s3-alpha-sig.figma.com/img/7213/858a/f55e6c4ddd1c96a1807e86f07e25aa43?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YKCdRkXUWnkDH4jKMbxQHb7I2cpyGjkucPCRxwmwubLbwP3YgvfVjXRN451D5vo7WEhQxVSqNMnNftyAV9O7-x75nfdvhBuxzoNIl~SaWoxK4FeE6EZwgl~78Ialz-bEUdkf9S22h2N4ic-LFiB0ZNnhSZJ3MlW7vi63XcPOUw6NkV2vqXWsEXQR4NxAqc5TGlmbJhg2BTK2zBXG0XJuVN5UQCrS9DmP6Cn7U3nuWtxv775FnIYbXUu9Hwpmw-6z2xbermiVofoiC~t2V5wIHCPn76iZ3r8nMCO4jSGBWcXK-L1Jvx9i2Wqggs9nKBNoVV1LwUBPqilhTbJd1Uz~kg__", product20);

        roleRepository.save(role);
        userRepository.save(user);
        categoryRepository.save(women);
        categoryRepository.save(men);
        categoryRepository.save(kids);
        categoryRepository.save(accessories);
        categoryRepository.save(home);
        categoryRepository.save(art);
        categoryRepository.save(computers);

        subCategoryRepository.save(womenAccessories);
        subCategoryRepository.save(bags);
        subCategoryRepository.save(womenShoes);
        subCategoryRepository.save(menAccessories);
        subCategoryRepository.save(shoes);
        subCategoryRepository.save(menClothes);
        subCategoryRepository.save(toys);
        subCategoryRepository.save(kidsClothes);
        subCategoryRepository.save(watches);
        subCategoryRepository.save(jewelry);
        subCategoryRepository.save(bedBath);
        subCategoryRepository.save(kitchenware);
        subCategoryRepository.save(paintings);
        subCategoryRepository.save(sculptures);
        subCategoryRepository.save(laptops);
        subCategoryRepository.save(peripherals);

        productRepository.save(product);
        productRepository.save(product2);
        productRepository.save(product3);
        productRepository.save(product4);
        productRepository.save(product5);
        productRepository.save(product6);
        productRepository.save(product7);
        productRepository.save(product8);
        productRepository.save(product9);
        productRepository.save(product10);
        productRepository.save(product11);
        productRepository.save(product12);
        productRepository.save(product13);
        productRepository.save(product14);
        productRepository.save(product15);
        productRepository.save(product16);
        productRepository.save(product17);
        productRepository.save(product18);
        productRepository.save(product19);
        productRepository.save(product20);

        productPictureRepository.save(productPicture1);
        productPictureRepository.save(productPicture2);
        productPictureRepository.save(productPicture3);
        productPictureRepository.save(productPicture4);
        productPictureRepository.save(productPicture5);
        productPictureRepository.save(productPicture6);
        productPictureRepository.save(productPicture7);
        productPictureRepository.save(productPicture8);
        productPictureRepository.save(productPicture9);
        productPictureRepository.save(productPicture10);
        productPictureRepository.save(productPicture11);
        productPictureRepository.save(productPicture12);
        productPictureRepository.save(productPicture13);
        productPictureRepository.save(productPicture14);
        productPictureRepository.save(productPicture15);
        productPictureRepository.save(productPicture16);
        productPictureRepository.save(productPicture17);
        productPictureRepository.save(productPicture18);
        productPictureRepository.save(productPicture19);
        productPictureRepository.save(productPicture20);
        productPictureRepository.save(productPicture21);
        productPictureRepository.save(productPicture22);
        productPictureRepository.save(productPicture23);
        productPictureRepository.save(productPicture24);
    }
}
