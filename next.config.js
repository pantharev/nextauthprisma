/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_AWS_S3_BUCKET_NAME: process.env.NEXT_AWS_S3_BUCKET_NAME,
        NEXT_AWS_S3_REGION: process.env.NEXT_AWS_S3_REGION,
    },
    images: {
        remotePatterns: [{
            hostname: 'avatars.githubusercontent.com',
            protocol: 'https',
        }, {
            hostname: `${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com`,
            protocol: 'https',
        }
    ]
    }
}

module.exports = nextConfig
