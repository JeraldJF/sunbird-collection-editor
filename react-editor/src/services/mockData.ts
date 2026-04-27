export const mockHierarchy = {
  id: 'root_1',
  name: 'Modern Science Textbook',
  primaryCategory: 'Digital Textbook',
  mimeType: 'application/vnd.ekstep.content-collection',
  root: true,
  metadata: {
    description: 'A comprehensive guide to modern science.',
    keywords: 'science, physics, biology'
  },
  children: [
    {
      id: 'unit_1',
      name: 'Chapter 1: The World of Atoms',
      primaryCategory: 'Textbook Unit',
      mimeType: 'application/vnd.ekstep.content-collection',
      metadata: {
        description: 'Basics of atomic structure.'
      },
      children: [
        {
          id: 'content_1',
          name: 'Atomic Structure Animation',
          primaryCategory: 'Explanation Content',
          mimeType: 'video/mp4',
          metadata: {
             artifactUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
          }
        },
        {
          id: 'content_2',
          name: 'History of Atomic Theory',
          primaryCategory: 'Learning Resource',
          mimeType: 'application/pdf',
          metadata: {
             artifactUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        }
      ]
    },
    {
      id: 'unit_2',
      name: 'Chapter 2: Chemical Reactions',
      primaryCategory: 'Textbook Unit',
      mimeType: 'application/vnd.ekstep.content-collection',
      metadata: {
        description: 'How substances interact.'
      },
      children: [
         {
          id: 'content_3',
          name: 'Reaction Lab Guide',
          primaryCategory: 'Learning Resource',
          mimeType: 'application/pdf',
          metadata: {
             artifactUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        }
      ]
    }
  ]
};
