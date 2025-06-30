import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async index(index: string, id: string, body: any) {
    await this.elasticsearchService.index({
      index,
      id,
      document: body,
    });
  }

  async update(index: string, id: string, body: any) {
    await this.elasticsearchService.update({
      index,
      id,
      doc: body,
    });
  }

  async remove(index: string, id: string) {
    await this.elasticsearchService.delete({
      index,
      id,
    });
  }

  async search(index: string, query: string) {
    const result = await this.elasticsearchService.search({
      index,
      query: {
        multi_match: {
          query,
          fields: ['name', 'status'],
        },
      },
    });

    return result.hits.hits.map((hit: any) => hit._source);
  }
}
