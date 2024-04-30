package ba.atlant.auctionapp.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;

@Service
@Log4j2
public class S3Service {
    private final AmazonS3 s3client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public S3Service(AmazonS3 s3client) {
        this.s3client = s3client;
    }

    public void uploadFile(String keyName, MultipartFile file) throws IOException {
        var putObjectResult = s3client.putObject(bucketName, keyName, file.getInputStream(), null);
        log.info(putObjectResult.getMetadata());
    }

    public S3Object getFile(String keyName) {
        return s3client.getObject(bucketName, keyName);
    }

    public String generateUrl(String fileName, HttpMethod httpMethod) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DATE, 7);

        return s3client.generatePresignedUrl(bucketName, fileName, calendar.getTime(), httpMethod).toString();
    }

    public String getBucketName() {
        return bucketName;
    }

    public String getRegion() {
        return s3client.getRegionName();
    }

    public void deleteObject(String filePath) {
        String fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
        final DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(this.bucketName, fileName);
        s3client.deleteObject(deleteObjectRequest);
    }
}
